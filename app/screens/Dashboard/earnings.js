import React from 'react'
import {View, StyleSheet, Platform, ScrollView, FlatList} from 'react-native';
import { Caption, Headline, Surface, Title, Subheading } from 'react-native-paper';
import { Button } from "../../components/Button";
import { colors } from '../../theme';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { Bar } from '../../components/Chart';
import { useSelector } from "react-redux";

const Earnings = () => {
  const { dark } = useSelector(({ theme }) => theme);

  return (
    <View style={classes.root}>
      <ScrollView>
        <View style={classes.headerRoot}>
          <Caption style={classes.headerTitle}>Total Balance</Caption>
          <View style={classes.headerAmountRoot}>
            <Caption style={classes.sign}>₦</Caption>
            <Headline style={classes.headerAmount}>7,350.00</Headline>
          </View>
          {/* <Button
            label="Withdraw"
            rootStyle={classes.buttonRoot}
            labelStyle={classes.button}
          /> */}
        </View>

        <View style={classes.chartRoot}>
          <Surface style={classes.surface}>
            <View style={classes.chartHeaderRoot}>
              <Icon name="chevron-left" size={30} color={colors.red.main} />
              <View style={classes.chartHeaderTitleRoot}>
                <Caption style={classes.chartHeaderTitle}>
                  Tue, 29th Sept ‘20
                </Caption>
                <View style={classes.chartHeaderAmountRoot}>
                  <Caption style={classes.signChart}>₦</Caption>
                  <Subheading style={classes.chartHeaderAmount}>
                    7,350.00
                  </Subheading>
                </View>
              </View>
              <Icon name="chevron-right" size={30} color={colors.red.main} />
            </View>

            <View style={classes.chartBodyRoot}>
              <Bar />
            </View>
            <View style={classes.chartFooterRoot}>
              <View style={classes.chartFootContainer}>
                <Subheading style={classes.chartFootTitle}>45</Subheading>
                <Caption>Orders</Caption>
              </View>
              <View style={classes.chartFootContainer}>
                <Subheading style={classes.chartFootTitle}>42:11</Subheading>
                <Caption>Online hours</Caption>
              </View>
              <View style={classes.chartFootContainer}>
                <Subheading style={classes.chartFootTitle}>114</Subheading>
                <Caption>Total Distance</Caption>
              </View>
            </View>
          </Surface>
        </View>

        <View style={classes.historyRoot}>
          <View
            style={[
              classes.historyHeaderTab,
              {backgroundColor: dark ? colors.grey.dark : colors.grey.light},
            ]}>
            <Subheading>September, 2020</Subheading>
          </View>

          <View>
            <FlatList
              data={[0, 1, 2, 3, 4, 5, 6]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View style={classes.historyListRoot}>
                  <View style={classes.historyListLeft}>
                    <Subheading style={classes.historyListAmount}>
                      Withdrawal from wallet
                    </Subheading>
                    <Caption style={classes.historyListDate}>
                      23 Sept, 2020
                    </Caption>
                  </View>
                  <Subheading style={classes.historyListAmount}>
                    ₦1,500
                  </Subheading>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Earnings

const classes = StyleSheet.create({
  root: {
    flex: 1,
    // paddingHorizontal: 20,
  },
  headerRoot: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  headerTitle: {
    fontSize: 15,
  },
  headerAmountRoot: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headerAmount: {
    fontSize: 30,
    fontWeight: '800',
  },
  sign: {
    fontSize: 15,
    color: colors.red.main,
  },
  buttonRoot: {
    width: 130,
    height: 41,
    backgroundColor: 'white',
    borderColor: colors.red.main,
    borderWidth: 1,
    borderRadius: 9,
  },
  button: {
    color: colors.red.main,
  },
  chartRoot: {
    flex: 4,
    margin: 20,
  },
  chartHeaderRoot: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 20,
    // marginBottom: 0,
    // marginTop: 0,
  },
  chartHeaderTitleRoot: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartHeaderTitle: {
    fontWeight: '300',
    fontSize: 14,
  },
  chartHeaderAmountRoot: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  chartHeaderAmount: {
    fontSize: 20,
    fontWeight: '800',
  },
  signChart: {
    fontSize: 10,
    color: colors.red.main,
  },
  chartBodyRoot: {},
  surface: {
    borderRadius: 11,
    elevation: Platform.select({ios: 1, android: 8}),
  },
  chartFooterRoot: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopColor: colors.grey.light,
    borderTopWidth: 1,
  },
  chartFootContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartFootTitle: {
    fontWeight: '700',
  },
  historyHeaderTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  historyListAmount: {
    fontWeight: '600',
    fontSize: 15,
  },
  historyListRoot: {
    marginHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderBottomColor: colors.hr.light,
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
});