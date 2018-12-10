'use strict';



var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

customElements.define('compodoc-menu', function (_HTMLElement) {
    _inherits(_class, _HTMLElement);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        _this.isNormalMode = _this.getAttribute('mode') === 'normal';
        return _this;
    }

    _createClass(_class, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            this.render(this.isNormalMode);
        }
    }, {
        key: 'render',
        value: function render(isNormalMode) {
            let tp = lithtml.html(
'<nav>\n    <ul class="list">\n        <li class="title">\n            \n                <a href="index.html" data-type="index-link">rucken:core</a>\n            \n        </li>\n\n        <li class="divider"></li>\n        ' + (isNormalMode ? '<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>' : '') + '\n        <li class="chapter">\n            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>\n            <ul class="links">\n                \n                    <li class="link">\n                        <a href="overview.html" data-type="chapter-link">\n                            <span class="icon ion-ios-keypad"></span>Overview\n                        </a>\n                    </li>\n                    <li class="link">\n                        <a href="index.html" data-type="chapter-link">\n                            <span class="icon ion-ios-paper"></span>README\n                        </a>\n                    </li>\n                \n                \n                    <li class="link">\n                        \n                            <a href="changelog.html"\n                        \n                        data-type="chapter-link">\n                            <span class="icon ion-ios-paper"></span>CHANGELOG\n                        </a>\n                    </li>\n                \n                    <li class="link">\n                        \n                            <a href="license.html"\n                        \n                        data-type="chapter-link">\n                            <span class="icon ion-ios-paper"></span>LICENSE\n                        </a>\n                    </li>\n                \n                \n                    <li class="link">\n                        <a href="dependencies.html"\n                            data-type="chapter-link">\n                            <span class="icon ion-ios-list"></span>Dependencies\n                        </a>\n                    </li>\n                \n            </ul>\n        </li>\n        \n        \n        <li class="chapter modules">\n            <a data-type="chapter-link" href="modules.html">\n                <div class="menu-toggler linked" data-toggle="collapse"\n                    ' + (isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"') + '>\n                    <span class="icon ion-ios-archive"></span>\n                    <span class="link-name">Modules</span>\n                    <span class="icon ion-ios-arrow-down"></span>\n                </div>\n            </a>\n            <ul class="links collapse"\n            ' + (isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"') + '>\n                \n                    <li class="link">\n                        <a href="modules/AccountModule.html" data-type="entity-link">AccountModule</a>\n                        \n                        \n                        \n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#injectables-links-module-AccountModule-539abc0951ed821ead53d4bdb86db87a"' : 'data-target="#xs-injectables-links-module-AccountModule-539abc0951ed821ead53d4bdb86db87a"') + '>\n                                    <span class="icon ion-md-arrow-round-down"></span>\n                                    <span>Injectables</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="injectables-links-module-AccountModule-539abc0951ed821ead53d4bdb86db87a"' : 'id="xs-injectables-links-module-AccountModule-539abc0951ed821ead53d4bdb86db87a"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="injectables/AccountService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AccountService</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/AuthModalModule.html" data-type="entity-link">AuthModalModule</a>\n                        \n                        \n                        \n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>\n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#components-links-module-AuthModule-c753bd8c3f862af2402096c2c00ef903"' : 'data-target="#xs-components-links-module-AuthModule-c753bd8c3f862af2402096c2c00ef903"') + '>\n                                    <span class="icon ion-md-cog"></span>\n                                    <span>Components</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="components-links-module-AuthModule-c753bd8c3f862af2402096c2c00ef903"' : 'id="xs-components-links-module-AuthModule-c753bd8c3f862af2402096c2c00ef903"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="components/AuthEmptyPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthEmptyPageComponent</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                        \n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#injectables-links-module-AuthModule-c753bd8c3f862af2402096c2c00ef903"' : 'data-target="#xs-injectables-links-module-AuthModule-c753bd8c3f862af2402096c2c00ef903"') + '>\n                                    <span class="icon ion-md-arrow-round-down"></span>\n                                    <span>Injectables</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="injectables-links-module-AuthModule-c753bd8c3f862af2402096c2c00ef903"' : 'id="xs-injectables-links-module-AuthModule-c753bd8c3f862af2402096c2c00ef903"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AuthService</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="injectables/TokenService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>TokenService</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/LangModule.html" data-type="entity-link">LangModule</a>\n                        \n                        \n                        \n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#injectables-links-module-LangModule-3f14c085e49e55bf83d1e4e08c32c78c"' : 'data-target="#xs-injectables-links-module-LangModule-3f14c085e49e55bf83d1e4e08c32c78c"') + '>\n                                    <span class="icon ion-md-arrow-round-down"></span>\n                                    <span>Injectables</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="injectables-links-module-LangModule-3f14c085e49e55bf83d1e4e08c32c78c"' : 'id="xs-injectables-links-module-LangModule-3f14c085e49e55bf83d1e4e08c32c78c"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="injectables/LangService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>LangService</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/ModalsModule.html" data-type="entity-link">ModalsModule</a>\n                        \n                        \n                        \n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#injectables-links-module-ModalsModule-c732a65d5f425e5620decac0a3012c80"' : 'data-target="#xs-injectables-links-module-ModalsModule-c732a65d5f425e5620decac0a3012c80"') + '>\n                                    <span class="icon ion-md-arrow-round-down"></span>\n                                    <span>Injectables</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="injectables-links-module-ModalsModule-c732a65d5f425e5620decac0a3012c80"' : 'id="xs-injectables-links-module-ModalsModule-c732a65d5f425e5620decac0a3012c80"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="injectables/ModalsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>ModalsService</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/PipesModule.html" data-type="entity-link">PipesModule</a>\n                        \n                        \n                        \n                        \n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#pipes-links-module-PipesModule-5fbeecb9ff7fdf76779caa8b7efe1192"' : 'data-target="#xs-pipes-links-module-PipesModule-5fbeecb9ff7fdf76779caa8b7efe1192"') + '>\n                                    <span class="icon ion-md-add"></span>\n                                    <span>Pipes</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="pipes-links-module-PipesModule-5fbeecb9ff7fdf76779caa8b7efe1192"' : 'id="xs-pipes-links-module-PipesModule-5fbeecb9ff7fdf76779caa8b7efe1192"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="pipes/CustomTranslatePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CustomTranslatePipe</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="pipes/PermPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PermPipe</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="pipes/SafeHtmlPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SafeHtmlPipe</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="pipes/UserPermPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserPermPipe</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/TransferHttpCacheModule.html" data-type="entity-link">TransferHttpCacheModule</a>\n                        \n                        \n                        \n                        \n                        \n                    </li>\n                \n            </ul>\n        </li>\n        \n        \n            \n        \n        \n        \n        \n        <li class="chapter">\n            <div class="simple menu-toggler" data-toggle="collapse"\n            ' + (isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"') + '>\n                <span class="icon ion-ios-paper"></span>\n                <span>Classes</span>\n                <span class="icon ion-ios-arrow-down"></span>\n            </div>\n            <ul class="links collapse"\n            ' + (isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"') + '>\n                \n                    <li class="link">\n                        <a href="classes/AuthModalComponent.html" data-type="entity-link">AuthModalComponent</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/AuthModalModel.html" data-type="entity-link">AuthModalModel</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/BaseEntityListComponent.html" data-type="entity-link">BaseEntityListComponent</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/BaseEntityListModalComponent.html" data-type="entity-link">BaseEntityListModalComponent</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/BasePromptComponent.html" data-type="entity-link">BasePromptComponent</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/BasePromptFormModalComponent.html" data-type="entity-link">BasePromptFormModalComponent</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/BasePromptModalComponent.html" data-type="entity-link">BasePromptModalComponent</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/BasePromptPanelComponent.html" data-type="entity-link">BasePromptPanelComponent</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/ContentType.html" data-type="entity-link">ContentType</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/EqualsToOtherProperty.html" data-type="entity-link">EqualsToOtherProperty</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/Group.html" data-type="entity-link">Group</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/IBaseForm.html" data-type="entity-link">IBaseForm</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/NotEqualsToPassword.html" data-type="entity-link">NotEqualsToPassword</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/Permission.html" data-type="entity-link">Permission</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/RedirectUriDto.html" data-type="entity-link">RedirectUriDto</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/User.html" data-type="entity-link">User</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/UserDto.html" data-type="entity-link">UserDto</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/UserTokenDto.html" data-type="entity-link">UserTokenDto</a>\n                    </li>\n                \n            </ul>\n        </li>\n        \n        \n            \n                <li class="chapter">\n                    <div class="simple menu-toggler" data-toggle="collapse"\n                        ' + (isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"') + '>\n                        <span class="icon ion-md-arrow-round-down"></span>\n                        <span>Injectables</span>\n                        <span class="icon ion-ios-arrow-down"></span>\n                    </div>\n                    <ul class="links collapse"\n                    ' + (isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"') + '>\n                        \n                            <li class="link">\n                                <a href="injectables/AuthModalService.html" data-type="entity-link">AuthModalService</a>\n                            </li>\n                        \n                            <li class="link">\n                                <a href="injectables/BrowserStorage.html" data-type="entity-link">BrowserStorage</a>\n                            </li>\n                        \n                            <li class="link">\n                                <a href="injectables/ErrorsExtractor.html" data-type="entity-link">ErrorsExtractor</a>\n                            </li>\n                        \n                            <li class="link">\n                                <a href="injectables/PermissionsGuard.html" data-type="entity-link">PermissionsGuard</a>\n                            </li>\n                        \n                            <li class="link">\n                                <a href="injectables/UniversalStorage.html" data-type="entity-link">UniversalStorage</a>\n                            </li>\n                        \n                    </ul>\n                </li>\n            \n        \n        \n        <li class="chapter">\n            <div class="simple menu-toggler" data-toggle="collapse"\n            ' + (isNormalMode ? 'data-target="#interceptors-links"' : 'data-target="#xs-interceptors-links"') + '>\n                <span class="icon ion-ios-swap"></span>\n                <span>Interceptors</span>\n                <span class="icon ion-ios-arrow-down"></span>\n            </div>\n            <ul class="links collapse"\n            ' + (isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"') + '>\n                \n                    <li class="link">\n                        <a href="interceptors/TokenInterceptor.html" data-type="entity-link">TokenInterceptor</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interceptors/TransferHttpCacheInterceptor.html" data-type="entity-link">TransferHttpCacheInterceptor</a>\n                    </li>\n                \n            </ul>\n        </li>\n        \n        \n        <li class="chapter">\n            <div class="simple menu-toggler" data-toggle="collapse"\n                 ' + (isNormalMode ? 'data-target="#guards-links"' : 'data-target="#xs-guards-links"') + '>\n            <span class="icon ion-ios-lock"></span>\n            <span>Guards</span>\n            <span class="icon ion-ios-arrow-down"></span>\n            </div>\n            <ul class="links collapse"\n                ' + (isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"') + '>\n            \n                <li class="link">\n                    <a href="guards/OauthGuard.html" data-type="entity-link">OauthGuard</a>\n                </li>\n            \n            </ul>\n            </li>\n        \n        \n        <li class="chapter">\n            <div class="simple menu-toggler" data-toggle="collapse"\n                ' + (isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"') + '>\n                <span class="icon ion-md-information-circle-outline"></span>\n                <span>Interfaces</span>\n                <span class="icon ion-ios-arrow-down"></span>\n            </div>\n            <ul class="links collapse"\n            ' + (isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"') + '>\n                \n                    <li class="link">\n                        <a href="interfaces/IAccountConfig.html" data-type="entity-link">IAccountConfig</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interfaces/IAuthConfig.html" data-type="entity-link">IAuthConfig</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interfaces/IAuthModalConfig.html" data-type="entity-link">IAuthModalConfig</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interfaces/IAuthModalOauthProvider.html" data-type="entity-link">IAuthModalOauthProvider</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interfaces/IBaseEntityGridFilter.html" data-type="entity-link">IBaseEntityGridFilter</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interfaces/IBaseEntityList.html" data-type="entity-link">IBaseEntityList</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interfaces/IBaseEntityListModal.html" data-type="entity-link">IBaseEntityListModal</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interfaces/IBaseEntityModalOptions.html" data-type="entity-link">IBaseEntityModalOptions</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interfaces/IBaseEntityModals.html" data-type="entity-link">IBaseEntityModals</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interfaces/IJwtConfig.html" data-type="entity-link">IJwtConfig</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interfaces/ILangConfig.html" data-type="entity-link">ILangConfig</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interfaces/ILanguagesItem.html" data-type="entity-link">ILanguagesItem</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interfaces/IModalRef.html" data-type="entity-link">IModalRef</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interfaces/IOauthConfig.html" data-type="entity-link">IOauthConfig</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interfaces/IStorage.html" data-type="entity-link">IStorage</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interfaces/ITransferHttpResponse.html" data-type="entity-link">ITransferHttpResponse</a>\n                    </li>\n                \n            </ul>\n        </li>\n        \n        \n            \n        \n        \n        <li class="chapter">\n            <div class="simple menu-toggler" data-toggle="collapse"\n            ' + (isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"') + '>\n                <span class="icon ion-ios-cube"></span>\n                <span>Miscellaneous</span>\n                <span class="icon ion-ios-arrow-down"></span>\n            </div>\n            <ul class="links collapse"\n            ' + (isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"') + '>\n                \n                    <li class="link">\n                      <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>\n                    </li>\n                \n                \n                    <li class="link">\n                      <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>\n                    </li>\n                \n                \n                \n                    <li class="link">\n                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>\n                    </li>\n                \n            </ul>\n        </li>\n        \n        \n            \n        \n        \n        <li class="chapter">\n            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>\n        </li>\n        \n        \n        \n        <li class="divider"></li>\n        <li class="copyright">\n                Documentation generated using <a href="https://compodoc.app/" target="_blank">\n                    \n                        \n                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">\n                        \n                    \n                </a>\n        </li>\n        \n    </ul>\n</nav>'
);
        this.innerHTML = tp.strings;
        }
    }]);

    return _class;
}(HTMLElement));