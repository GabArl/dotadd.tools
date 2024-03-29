"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._static_implements = _static_implements;
exports.ContainerType = void 0;
var ContainerType;
exports.ContainerType = ContainerType;

(function (ContainerType) {
  ContainerType[ContainerType["XML"] = 0] = "XML";
  ContainerType[ContainerType["JSON"] = 1] = "JSON";
  ContainerType[ContainerType["CSV"] = 2] = "CSV";
  ContainerType[ContainerType["AMBDEC"] = 3] = "AMBDEC";
  ContainerType[ContainerType["CONFIG"] = 4] = "CONFIG";
})(ContainerType || (exports.ContainerType = ContainerType = {}));
/* class decorator */


function _static_implements() {
  return constructor => {
    constructor;
  };
}

;
//# sourceMappingURL=ADCFormat.js.map