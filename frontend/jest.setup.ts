import '@testing-library/jest-dom';
// jest.setup.ts
// import { TextEncoder, TextDecoder } from 'node:util';

// global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;
import { TextEncoder as NodeTextEncoder, TextDecoder as NodeTextDecoder } from 'node:util';

global.TextEncoder = NodeTextEncoder as typeof TextEncoder;
global.TextDecoder = NodeTextDecoder as typeof TextDecoder;
