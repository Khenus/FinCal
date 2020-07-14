import * as React from 'react';
import { LayoutChangeEvent, SectionListData, RegisteredStyle, ViewStyle } from 'react-native';
interface IProps {
    sections: SectionListData<any>[];
    renderTab: (section: SectionListData<any>) => React.ReactNode;
    tabBarStyle?: ViewStyle | RegisteredStyle<ViewStyle>;
    currentIndex: number;
    onPress: (index: number) => void;
}
export default class TabBar extends React.PureComponent<IProps, any> {
    private scrollView;
    private _tabContainerMeasurements;
    private _tabsMeasurements;
    componentDidUpdate(prevProps: IProps): void;
    getScrollAmount: () => number;
    onTabContainerLayout: (e: LayoutChangeEvent) => void;
    onTabLayout: (key: number) => (ev: LayoutChangeEvent) => void;
    renderTab: (section: SectionListData<any>, key: number) => JSX.Element;
    render(): JSX.Element;
}
export {};
