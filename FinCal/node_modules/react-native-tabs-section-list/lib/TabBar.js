"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var WindowWidth = react_native_1.Dimensions.get('window').width;
var TabBar = /** @class */ (function (_super) {
    __extends(TabBar, _super);
    function TabBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollView = React.createRef();
        _this._tabsMeasurements = {};
        _this.getScrollAmount = function () {
            var currentIndex = _this.props.currentIndex;
            var position = currentIndex;
            var pageOffset = 0;
            var containerWidth = WindowWidth;
            var tabWidth = _this._tabsMeasurements[position].width;
            var nextTabMeasurements = _this._tabsMeasurements[position + 1];
            var nextTabWidth = (nextTabMeasurements && nextTabMeasurements.width) || 0;
            var tabOffset = _this._tabsMeasurements[position].left;
            var absolutePageOffset = pageOffset * tabWidth;
            var newScrollX = tabOffset + absolutePageOffset;
            newScrollX -=
                (containerWidth -
                    (1 - pageOffset) * tabWidth -
                    pageOffset * nextTabWidth) /
                    2;
            newScrollX = newScrollX >= 0 ? newScrollX : 0;
            var rightBoundScroll = Math.max(_this._tabContainerMeasurements.width - containerWidth, 0);
            newScrollX = newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX;
            return newScrollX;
        };
        _this.onTabContainerLayout = function (e) {
            _this._tabContainerMeasurements = e.nativeEvent.layout;
        };
        _this.onTabLayout = function (key) { return function (ev) {
            var _a = ev.nativeEvent.layout, x = _a.x, width = _a.width, height = _a.height;
            _this._tabsMeasurements[key] = {
                left: x,
                right: x + width,
                width: width,
                height: height
            };
        }; };
        _this.renderTab = function (section, key) {
            var _a = _this.props, renderTab = _a.renderTab, onPress = _a.onPress, currentIndex = _a.currentIndex;
            var isActive = currentIndex === key;
            return (<react_native_1.TouchableOpacity onPress={function () { return onPress(key); }} key={key} onLayout={_this.onTabLayout(key)}>
        {renderTab(__assign({ isActive: isActive }, section))}
      </react_native_1.TouchableOpacity>);
        };
        return _this;
    }
    TabBar.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.currentIndex !== prevProps.currentIndex) {
            if (this.scrollView.current) {
                this.scrollView.current.scrollTo({
                    x: this.getScrollAmount(),
                    animated: true
                });
            }
        }
    };
    TabBar.prototype.render = function () {
        var _a = this.props, sections = _a.sections, tabBarStyle = _a.tabBarStyle;
        return (<react_native_1.View style={[{ width: WindowWidth }, tabBarStyle]}>
        <react_native_1.ScrollView ref={this.scrollView} showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ flexDirection: 'row' }}>
          <react_native_1.View onLayout={this.onTabContainerLayout} style={[{ flexDirection: 'row' }]}>
            {sections.map(this.renderTab)}
          </react_native_1.View>
        </react_native_1.ScrollView>
      </react_native_1.View>);
    };
    return TabBar;
}(React.PureComponent));
exports.default = TabBar;
//# sourceMappingURL=TabBar.js.map