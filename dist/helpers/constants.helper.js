"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_LIMIT = exports.DEFAULT_PAGE = exports.Status = exports.Gender = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role["MANAGER"] = "manager";
    Role["USER"] = "user";
})(Role || (exports.Role = Role = {}));
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
})(Gender || (exports.Gender = Gender = {}));
var Status;
(function (Status) {
    Status["BORROWED"] = "borrowed";
    Status["RETURNED"] = "returned";
    Status["PENDING"] = "pending";
    Status["OVERDUE"] = "overdue";
})(Status || (exports.Status = Status = {}));
exports.DEFAULT_PAGE = 1;
exports.DEFAULT_LIMIT = 10;
