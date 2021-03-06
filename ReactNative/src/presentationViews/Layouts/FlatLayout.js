import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {

    StyleSheet,
    View
} from 'react-native'
import {HEIGHT, WIDTH} from "../../constants";

const borderRightWidth = 2;
const flatStyle = StyleSheet.create({
    columnContainer: {
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F7F7'
    },
    columnChild: {
        shadowColor: '#000000',
        backgroundColor: '#FFFFFF',
        shadowOpacity: 0.35,
        shadowOffset: {width: .1, height: .1},
        marginBottom: 15
    }


});


class FlatLayout extends Component {
    render() {
        const children = this.props.children;
        var topMarginOnFirstChild = this.props.topMargin;
        var widthPercent = this.props.widthPercent;
        return (
            <View style={[flatStyle.columnContainer, {width: "100%"}]}>
                <View style={{flex: 1}}/>
                {
                    React.Children.map(children, (child, index) => {
                        if (index > 0) {
                            topMarginOnFirstChild = 0;
                        }
                        return (
                            <View style={[{
                                marginTop: topMarginOnFirstChild,
                                width: widthPercent
                            }, flatStyle.columnChild]}>
                                {child}
                            </View>

                        )
                    })
                }
                <View style={{flex: 1}}/>
            </View>
        );
    }
}
FlatLayout.defaultProps = {
    topMargin: 0,
    widthPercent: "95%"
};
class GridLayout extends Component {
    render() {
        let {children,containerStyle,columnStyle,backgroundColor,width,height,rows,cols,seperatorColor,rowSeperatorWidth,colSeperatorWidth }= this.props;
        let widthPerRowElement =  (width  - ((cols + 1) * colSeperatorWidth))/ cols;
        let heightPerElement = height / rows;
        let arrRows = [];
        let j = -1;
        let defaultColumnStyle = {
            backgroundColor: backgroundColor,
                flexDirection: 'row',
                alignSelf: "center"
        };
        let newColumnStyle = Object.assign({},columnStyle);
        newColumnStyle ["height"] =  heightPerElement;




        React.Children.map(children, (child, index) => {
            if ((index % cols) === 0) {
                j++;
                // push new row
                arrRows.push([]);
                // push row seperator
                arrRows.push((<View style={{ height: rowSeperatorWidth, backgroundColor: seperatorColor}}/>))
            }

            if(arrRows[j * 2].length == 0){
                arrRows[j * 2].push((<View style={{
                    width: colSeperatorWidth,
                    backgroundColor: seperatorColor
                }}/>));
            }
            arrRows[j * 2].push(child);
            // push row element seperator
                arrRows[j * 2].push((<View style={{
                    width: colSeperatorWidth,
                    backgroundColor: seperatorColor
                }}/>));
        });

        if(this.props.titleView){
            // push row seperator
            arrRows.unshift((<View style={{ height: rowSeperatorWidth, backgroundColor: seperatorColor}}/>))
            arrRows.unshift([
                <View style={{
                width: colSeperatorWidth,
                backgroundColor: seperatorColor
            }}/>,
                <View style={{flex:1}}>{this.props.titleView}</View>,
                <View style={{
                    width: colSeperatorWidth,
                    backgroundColor: seperatorColor
                }}/>]);
        }
        return (
            <View style={[this.props.containerStyle, {flexDirection: 'column'}]}>
                <View style={{ height: rowSeperatorWidth, backgroundColor: seperatorColor}}/>
                {arrRows.map((row, i) => {
                    return (
                        i % 2 === 0 ? <View style={[defaultColumnStyle,newColumnStyle]}>
                            {row}
                        </View> : row
                    )

                })}

            </View>
        )
    }
}

GridLayout.defaultProps = {
    backgroundColor :"#FFFFFF",
    rowStyle : {},
    containerStyle: {},
    width: WIDTH,
    height: HEIGHT,
    rows: 2,
    cols: 2,
    titleView : null,
    seperatorColor: "#f7f7f7",
    rowSeperatorWidth: 2,
    colSeperatorWidth: 2,
};


export {FlatLayout,GridLayout}