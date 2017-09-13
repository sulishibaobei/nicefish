webpackJsonp([4],{

/***/ "../../../../../src/app/post/write-post/write-post.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"write-post-container\" [@flyIn]=\"'active'\">\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <form role=\"form\">\n                <div class=\"form-group\">\n                    <input type=\"text\" class=\"form-control\" placeholder=\"标题，2到32个字符\">\n                </div>\n                <div class=\"form-group\">\n                    <input type=\"text\" class=\"form-control\" placeholder=\"原文URL，如果是转载请粘贴，最长1024个字符\">\n                </div>\n                <div class=\"form-group\">\n                    <textarea id=\"post_editor\" class=\"form-control\" rows=\"20\" placeholder=\"内容，最少140字，最多2万字。图片每张最大500K，每篇文章最多50张图。\"></textarea>\n                    <iframe id=\"form_target\" name=\"form_target\" style=\"display:none\"></iframe>\n                    <form id=\"file_upload_form\" target=\"form_target\" method=\"post\" enctype=\"multipart/form-data\" style=\"width:0px;height:0;overflow:hidden\">\n                        <input id=\"img_input\" name=\"image\" type=\"file\" (change)=\"fileInputChangeHandler()\">\n                    </form>\n                </div>\n                <button type=\"submit\" class=\"btn btn-success\">提交</button>\n            </form>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/post/write-post/write-post.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".write-post-container {\n  padding-right: 2px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/post/write-post/write-post.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animations_fly_in__ = __webpack_require__("../../../../../src/app/animations/fly-in.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WritePostComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WritePostComponent = (function () {
    function WritePostComponent() {
    }
    WritePostComponent.prototype.ngOnInit = function () {
    };
    WritePostComponent.prototype.fileInputChangeHandler = function () {
        var fileInput = document.getElementById('img_input');
        var inputValue = fileInput.value;
        if (!inputValue) {
            return;
        }
        //提交隐藏的表单，上传文件
        var fileForm = document.getElementById('file_upload_form');
        fileForm.action = "fileuploadurl";
        fileForm.onsubmit = function (event) {
            console.log(event);
            event.preventDefault();
            var file = fileInput.files[0];
            var formData = new FormData();
            formData.append('file', file, file.name);
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open('POST', 'file_upload_URL.php');
            xhr.onload = function () {
                var json;
                if (xhr.status != 200) {
                    console.log('HTTP Error: ' + xhr.status);
                    return;
                }
                json = JSON.parse(xhr.responseText);
                if (!json || typeof json.location != 'string') {
                    console.log('Invalid JSON: ' + xhr.responseText);
                    return;
                }
                console.log(json.location);
                fileInput.value = '';
            };
            xhr.send(formData);
        };
        fileForm.submit();
        fileInput.value = '';
    };
    WritePostComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        /**
         *  【非常重要】
         *  关于TinyMCE的完整文档，请查看这里https://www.tinymce.com/docs/
         */
        tinymce.init({
            selector: '#post_editor',
            skin_url: '/assets/skins/lightgray',
            //menubar:false,
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons template paste textcolor colorpicker textpattern imagetools codesample'
            ],
            toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            toolbar2: 'print preview media | forecolor backcolor emoticons | codesample',
            image_advtab: true,
            codesample_content_css: '/assets/css/prism.css',
            //文件和图片上传相关的选项
            file_browser_callback_types: 'image',
            file_browser_callback: function (field_name, url, type, win) {
                console.log(type);
                console.log(type == 'image');
                if (type == 'image') {
                    var event = new MouseEvent('click', {
                        'view': window,
                        'bubbles': true,
                        'cancelable': true
                    });
                    var fileInput = document.getElementById('img_input');
                    fileInput.dispatchEvent(event);
                }
            },
            setup: function (editor) {
                _this.editor = editor;
                editor.on('keyup', function () {
                    var content = editor.getContent();
                    console.log(content);
                });
            }
        });
    };
    WritePostComponent.prototype.ngOnDestroy = function () {
        tinymce.remove(this.editor);
    };
    return WritePostComponent;
}());
WritePostComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-write-post',
        template: __webpack_require__("../../../../../src/app/post/write-post/write-post.component.html"),
        styles: [__webpack_require__("../../../../../src/app/post/write-post/write-post.component.scss")],
        animations: [
            __WEBPACK_IMPORTED_MODULE_1__animations_fly_in__["a" /* flyIn */]
        ]
    }),
    __metadata("design:paramtypes", [])
], WritePostComponent);

//# sourceMappingURL=D:/Users/uidp4983/nicefish/src/write-post.component.js.map

/***/ }),

/***/ "../../../../../src/app/user/user-main/user-main.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"user-main-container\" [@flyIn]=\"'active'\">\n    <div class=\"row\">\n        <div class=\"col-sm-9\">\n            <router-outlet (activate)='onActivate($event)' (deactivate)='onDeactivate($event)'></router-outlet>\n        </div>\n        <div class=\"col-sm-3\">\n            <app-user-info panelTitle=\"用户信息\" (follow)=\"doFollow()\"></app-user-info>\n            <div class=\"list-group\">\n                <a routerLink=\"write\" class=\"list-group-item\">写作</a>\n                <a routerLink=\"posttable/page/1\" class=\"list-group-item\"><span class=\"badge\">104</span>文章管理</a>\n                <a routerLink=\"commenttable/page/1\" class=\"list-group-item\"><span class=\"badge\">24</span>评论管理</a>\n                <a routerLink=\"profile\" class=\"list-group-item\">个人设置</a>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/user/user-main/user-main.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/user/user-main/user-main.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animations_fly_in__ = __webpack_require__("../../../../../src/app/animations/fly-in.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserMainComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserMainComponent = (function () {
    function UserMainComponent() {
    }
    UserMainComponent.prototype.ngOnInit = function () {
    };
    UserMainComponent.prototype.onActivate = function (component) {
        console.log("组件加载完成>" + component);
    };
    UserMainComponent.prototype.onDeactivate = function (component) {
        console.log("组件已经移除>" + component);
    };
    UserMainComponent.prototype.doFollow = function () {
        alert("自己不能关注自己！");
    };
    return UserMainComponent;
}());
UserMainComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-user-main',
        template: __webpack_require__("../../../../../src/app/user/user-main/user-main.component.html"),
        styles: [__webpack_require__("../../../../../src/app/user/user-main/user-main.component.scss")],
        animations: [
            __WEBPACK_IMPORTED_MODULE_1__animations_fly_in__["a" /* flyIn */]
        ]
    }),
    __metadata("design:paramtypes", [])
], UserMainComponent);

//# sourceMappingURL=D:/Users/uidp4983/nicefish/src/user-main.component.js.map

/***/ }),

/***/ "../../../../../src/app/user/user.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_post_module__ = __webpack_require__("../../../../../src/app/shared/post.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__post_write_post_write_post_component__ = __webpack_require__("../../../../../src/app/post/write-post/write-post.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__user_main_user_main_component__ = __webpack_require__("../../../../../src/app/user/user-main/user-main.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__manage_post_table_services_post_table_service__ = __webpack_require__("../../../../../src/app/manage/post-table/services/post-table.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__user_routes__ = __webpack_require__("../../../../../src/app/user/user.routes.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserModule", function() { return UserModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var UserModule = (function () {
    function UserModule() {
    }
    return UserModule;
}());
UserModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__user_main_user_main_component__["a" /* UserMainComponent */],
            __WEBPACK_IMPORTED_MODULE_6__post_write_post_write_post_component__["a" /* WritePostComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_4__shared_shared_module__["a" /* SharedModule */],
            __WEBPACK_IMPORTED_MODULE_5__shared_post_module__["a" /* PostSharedModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* RouterModule */].forChild(__WEBPACK_IMPORTED_MODULE_9__user_routes__["a" /* userRoutes */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_7__user_main_user_main_component__["a" /* UserMainComponent */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_8__manage_post_table_services_post_table_service__["a" /* PostTableService */]
        ]
    })
], UserModule);

//# sourceMappingURL=D:/Users/uidp4983/nicefish/src/user.module.js.map

/***/ }),

/***/ "../../../../../src/app/user/user.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_main_user_main_component__ = __webpack_require__("../../../../../src/app/user/user-main/user-main.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_profile_user_profile_component__ = __webpack_require__("../../../../../src/app/user/user-profile/user-profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__post_write_post_write_post_component__ = __webpack_require__("../../../../../src/app/post/write-post/write-post.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__manage_post_table_post_table_component__ = __webpack_require__("../../../../../src/app/manage/post-table/post-table.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__manage_comment_table_comment_table_component__ = __webpack_require__("../../../../../src/app/manage/comment-table/comment-table.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return userRoutes; });





var userRoutes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_0__user_main_user_main_component__["a" /* UserMainComponent */],
        children: [
            { path: '', redirectTo: 'posttable/page/1', pathMatch: 'full' },
            { path: 'write', component: __WEBPACK_IMPORTED_MODULE_2__post_write_post_write_post_component__["a" /* WritePostComponent */] },
            { path: 'posttable/page/:page', component: __WEBPACK_IMPORTED_MODULE_3__manage_post_table_post_table_component__["a" /* PostTableComponent */] },
            { path: 'commenttable/page/:page', component: __WEBPACK_IMPORTED_MODULE_4__manage_comment_table_comment_table_component__["a" /* CommentTableComponent */] },
            { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_1__user_profile_user_profile_component__["a" /* UserProfileComponent */] },
            { path: '**', redirectTo: 'write' }
        ]
    }
];
//# sourceMappingURL=D:/Users/uidp4983/nicefish/src/user.routes.js.map

/***/ })

});
//# sourceMappingURL=4.chunk.js.map