const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();
router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refreshToken', validate(authValidation.refreshTokens), authController.refreshTokens);
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/reset-password/', validate(authValidation.resetPassword), authController.resetPassword);
router.get('/send-verification-email', auth(), authController.sendVerificationEmail);
router.get('/verify-email/:token', validate(authValidation.verifyEmail), authController.verifyEmail);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * path:
 *  /auth/register:
 *    post:
 *      summary: Register as user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - email
 *                - password
 *                - phonecode
 *                - phone
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                  format: email
 *                  description: must be unique
 *                password:
 *                  type: string
 *                  format: password
 *                  minLength: 8
 *                  description: At least one number and one letter
 *                phonecode:
 *                  type: string
 *                phone:
 *                  type: string
 *              example:
 *                name: fake name
 *                email: fake@example.com
 *                password: password1
 *                phonecode: '+91'
 *                phone: '9876543210'
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/MessageType'
 *                  example:
 *                      serverResponse :
 *                          code: 200
 *                          message: You have been successfully registered.
 *        "400":
 *          $ref: '#/components/responses/DuplicateEmail'
 */

/**
 * @swagger
 * path:
 *  /auth/login:
 *    post:
 *      summary: Login
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                password:
 *                  type: string
 *                  format: password
 *              example:
 *                email: fake@example.com
 *                password: password1
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  serverResponse:
 *                    type: object
 *                    properties:
 *                      code:
 *                          type: number
 *                      message:
 *                          type: string
 *                    example:
 *                      serverResponse :
 *                          code: 200
 *                          message: You have successfully logged in.
 *                  user:
 *                    $ref: '#/components/schemas/User'
 *                  tokens:
 *                    $ref: '#/components/schemas/AuthTokens'
 *        "401":
 *          description: Invalid email or password
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/MessageType'
 *              example:
 *                serverResponse :
 *                  code: 200
 *                  message: Invalid email or password.
 */

/**
 * @swagger
 * path:
 *  /auth/logout:
 *    post:
 *      summary: Logout
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - refreshToken
 *              properties:
 *                refreshToken:
 *                  type: string
 *              example:
 *                refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg
 *      responses:
 *        "200":
 *          description: ok
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageType'
 *             example:
 *               serverResponse :
 *                  code: 200
 *                  message: You have been successfully logged out!
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * path:
 *  /auth/refresh-tokens:
 *    post:
 *      summary: Refresh auth tokens
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - refreshToken
 *              properties:
 *                refreshToken:
 *                  type: string
 *              example:
 *                refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  serverResponse:
 *                    type: object
 *                    properties:
 *                      code:
 *                          type: number
 *                      message:
 *                          type: string
 *                    example:
 *                      serverResponse :
 *                          code: 200
 *                          message: You have successfully logged in.
 *                  tokens:
 *                     $ref: '#/components/schemas/AuthTokens'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * paths:
 *  /auth/forgot-password-otp:
 *    post:
 *      summary: Forgot password with otp
 *      description: An email will be sent to reset password otp.
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *              example:
 *                email: fake@example.com
 *      responses:
 *        "200":
 *          description: ok
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/MessageType'
 *              example:
 *                serverResponse :
 *                  code: 200
 *                  message: Verification code has been sent to your email address.
 *        '404':
 *          description: User Not Found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/MessageType'
 *              example:
 *                serverResponse :
 *                  code: 404
 *                  message: No user found with this email.
 */

/**
 * @swagger
 * paths:
 *  /auth/otp-verification:
 *    post:
 *      summary: Otp verification by otp and email
 *      description: An otp is sent to your email id.
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - otp
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                otp:
 *                  type: string
 *              example:
 *                email: fake@example.com
 *                otp: "89788"
 *      responses:
 *        "200":
 *          description: ok
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/MessageType'
 *                isVerificationSuccess:
 *                  type: boolean
 *              example:
 *                serverResponse :
 *                  code: 200
 *                  message: Success.
 *                isVerificationSuccess: true
 *        '404':
 *          description: User Not Found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/MessageType'
 *              example:
 *                serverResponse :
 *                  code: 404
 *                  message: No data found with this email.
 */

/**
 * @swagger
 * paths:
 *  /auth/reset-password:
 *    post:
 *      summary: Reset password
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - password
 *                - email
 *                - otp
 *              properties:
 *                password:
 *                  type: string
 *                  format: password
 *                  minLength: 8
 *                  description: At least one number and one letter
 *                email:
 *                  type: string
 *                  format: email
 *                otp:
 *                  type: string
 *              example:
 *                password: password1
 *                email: fake@example.com
 *                otp: "89788"
 *      responses:
 *        "200":
 *          description: ok
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/MessageType'
 *              example:
 *                serverResponse :
 *                  code: 200
 *                  message: Your password has been reset successfully.
 *        "400":
 *          description: User not found/OTP dose not match
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/MessageType'
 *              example:
 *                serverResponse :
 *                  code: 400
 *                  message: User not found/OTP dose not match
 */

