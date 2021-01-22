"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spacedbox_1 = require("./renderkit/spacedbox");
const b1 = new spacedbox_1.SpacedBox(['1', '2', '-', '4'], 2);
const b2 = new spacedbox_1.SpacedBox(['1', '-', '3', '4', '5'], 1);
const b3 = new spacedbox_1.SpacedBox(['1', '-'], 1);
const b4 = new spacedbox_1.SpacedBox(['-', '2'], 0);
const b5 = new spacedbox_1.SpacedBox(['-', '2', '3'], 0);
const box = spacedbox_1.SpacedBox.joinBoxesVertically([b1, b2, b3, b4, b5], spacedbox_1.SpacedBox.initWithText(" + ", 0));
console.log(box.plainTextForm);
