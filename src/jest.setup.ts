import "@testing-library/jest-dom";

// // src/setupTests.js
import { mswServer } from "./mocksRest/mswServer";
// Establish API mocking before all tests.

process.env.NEXT_PUBLIC_DEV_MODE = "enabled";
process.env.NEXT_PUBLIC_API_MOCKING = "enabled";
// beforeAll(() => mswServer.listen())

// // Reset any request handlers that we may add during the tests,
// // so they don't affect other tests.
// afterEach(() => mswServer.resetHandlers())

// // Clean up after the tests are finished.
// afterAll(() => mswServer.close())
