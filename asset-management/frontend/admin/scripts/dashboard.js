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
function loadAssets() {
    return __awaiter(this, void 0, void 0, function () {
        var response, assets, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:8080/assets", {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to fetch assets");
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    assets = _a.sent();
                    populateAssets(assets);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching assets:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function populateAssets(assets) {
    var assetsTableBody = document.getElementById("assets-table-body");
    assetsTableBody.innerHTML = "";
    assets.forEach(function (asset) {
        var row = document.createElement("tr");
        row.classList.add("asset-row");
        row.innerHTML = "\n            <td>".concat(asset.id, "</td>\n            <td>").concat(asset.name, "</td>\n            <td>").concat(asset.brand, "</td>\n            <td>").concat(asset.type, "</td>\n            <td>").concat(asset.status, "</td>\n            <td>").concat(asset.employee_id, "</td>\n            <td><button class=\"info-btn\" data-id=\"").concat(asset.id, "\">Unassign</button></td>\n            <td><button class=\"del-btn\" data-id=\"").concat(asset.name, "\">Del</button></td>\n        ");
        assetsTableBody.appendChild(row);
    });
    document.querySelectorAll('.del-btn').forEach(function (button) {
        button.addEventListener('click', function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var assetName, response, result, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            event.preventDefault();
                            assetName = event.currentTarget.getAttribute('data-id');
                            alert("Delete functionality for asset ID: ".concat(assetName, " will be added here."));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, fetch("http://localhost:8080/assets/".concat(assetName), {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                                    },
                                    body: JSON.stringify({ assetName: assetName })
                                })];
                        case 2:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 3:
                            result = _a.sent();
                            if (response.ok) {
                                alert('Asset disposed successfully!');
                            }
                            else {
                                alert(result.message || 'Failed to dispose');
                            }
                            return [3 /*break*/, 5];
                        case 4:
                            error_2 = _a.sent();
                            console.error('Error:', error_2);
                            alert('An error occurred while disposing the asset.');
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        });
    });
    document.querySelectorAll('.info-btn').forEach(function (button) {
        button.addEventListener('click', function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var asset_id, response, result, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            event.preventDefault();
                            asset_id = event.currentTarget.getAttribute('data-id');
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, fetch("http://localhost:8080/assets/".concat(asset_id), {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ asset_id: asset_id })
                                })];
                        case 2:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 3:
                            result = _a.sent();
                            if (response.ok) {
                                alert('Asset unassigned successfully!');
                            }
                            else {
                                alert(result.message || 'Failed to unassign');
                            }
                            return [3 /*break*/, 5];
                        case 4:
                            error_3 = _a.sent();
                            console.error('Error:', error_3);
                            alert('An error occurred while unassigning the asset.');
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        });
    });
}
document.addEventListener("DOMContentLoaded", loadAssets);
