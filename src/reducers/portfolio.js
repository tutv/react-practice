import {BUY_STOCK, INCREASE_FUNDS, SELL_STOCK, SET_PORTFOLIO} from "../actions/types";

const portfolio = (state = {
    funds: 10000,
    stocks: []
}, action) => {
    switch (action.type) {
        case INCREASE_FUNDS: {
            return {...state, funds: state.funds + action.data};
        }

        case SELL_STOCK: {
            let {stockId, quantity, stockPrice} = action.data;

            const record = state.stocks.find((element) => {
                return element.id === stockId;
            });

            if (record.quantity > quantity) {
                record.quantity -= quantity;
            } else {
                state.stocks.splice(state.stocks.indexOf(record), 1);
            }

            state.funds += stockPrice * quantity;

            return state;
        }

        case SET_PORTFOLIO: {
            let portfolio = action.data;
            state.funds = portfolio.funds;
            state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];

            return state;
        }

        case BUY_STOCK: {
            let {stockId, quantity, stockPrice} = action.data;

            const record = state.stocks.find((element) => {
                return element.id === stockId;
            });

            if (record) {
                record.quantity += quantity;
            } else {
                state.stocks.push({
                    id: stockId,
                    quantity
                });
            }

            state.funds -= stockPrice * quantity;

            return state;
        }

        default:
            return state;
    }
};

export default portfolio;

export const funds = (state) => {
    return state.funds;
};