import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    console.log("access Token ", accessToken);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating Tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // Get user details from frontend
  // Validation - Not empty
  // check is user already exists
  // check for images, check for avatar
  // upload them to cloud, avatar
  // create user Object - create entry in db
  // remove password and resfresh token field from response
  // check for user creation
  // return response

  const { email, password } = req.body;
  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All Fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ email }],
  });

  if (existedUser) {
    throw new ApiError(409, " Email already existed");
  }

  const user = await User.create({
    email: email,
    password: password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while register the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registerd successfully"));
});

const loginuser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log("Email and Password : ", email);
  console.log(" Password : ", password);

  if (!email) {
    throw new ApiError(400, "email or password is required");
  }

  const existedUser = await User.findOne({
    $or: [{ email }],
  });

  if (existedUser) {
    const isPasswordValid = await existedUser.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credetional");
    }
    console.log("Existed user : ", existedUser._id);
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      existedUser._id
    );

    const loggedInUser = await User.findById(existedUser._id).select(
      "-refreshToken -password"
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accessToken,
            refreshToken,
          },
          "User logged in SuccessFully"
        )
      );
  } else {
    throw new ApiError(404, "User does not exist");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user Logged Out"));
});

export { registerUser, loginuser, logoutUser };
