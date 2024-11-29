var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
document.getElementById('editProfileForm').addEventListener('submit', function (event) {
    return __awaiter(this, void 0, void 0, function () {
        var email, firstname, lastname, location, phone_number, user_id, profileData, response, result, messageElement, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    email = document.getElementById("email").value;
                    firstname = document.getElementById("firstname").value;
                    lastname = document.getElementById("lastname").value;
                    location = document.getElementById("location").value;
                    phone_number = document.getElementById("phone_number").value;
                    user_id = localStorage.getItem('user_id');
                    profileData = {
                        email: email,
                        firstname: firstname || null,
                        lastname: lastname || null,
                        location: location || null,
                        phone_number: phone_number || null
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("http://localhost:8080/employees/".concat(user_id), {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(profileData)
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    result = _a.sent();
                    messageElement = document.getElementById("message");
                    if (response.ok) {
                        messageElement.innerText = "Profile updated successfully!";
                        messageElement.style.color = "green";
                    }
                    else {
                        messageElement.innerText = "Error: ".concat(result.error);
                        messageElement.style.color = "red";
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error updating profile:", error_1);
                    document.getElementById("message").innerText = "Failed to update profile. Please try again.";
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
});
// async function submitProfile() {
//     const email = (document.getElementById("email") as HTMLInputElement).value;
//     const firstname = (document.getElementById("firstname") as HTMLInputElement).value;
//     const lastname = (document.getElementById("lastname") as HTMLInputElement).value;
//     const location = (document.getElementById("location") as HTMLInputElement).value;
//     const phone_number = (document.getElementById("phone_number") as HTMLInputElement).value;
//
//     const user_id = localStorage.getItem('user_id');
//
//     const profileData = {
//         email: email,
//         firstname: firstname || null,
//         lastname: lastname || null,
//         location: location || null,
//         phone_number: phone_number || null
//     };
//
//     try {
//         const response = await fetch(`http://localhost:8080/employees/${user_id}`, {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(profileData)
//         });
//
//         const result = await response.json();
//
//         const messageElement = document.getElementById("message");
//         if (response.ok) {
//             messageElement!.innerText = "Profile updated successfully!";
//             messageElement!.style.color = "green";
//         } else {
//             messageElement!.innerText = `Error: ${result.error}`;
//             messageElement!.style.color = "red";
//         }
//     } catch (error) {
//         console.error("Error updating profile:", error);
//         document.getElementById("message")!.innerText = "Failed to update profile. Please try again.";
//     }
// }
