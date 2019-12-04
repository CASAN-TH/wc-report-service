'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ReportSchema = new Schema({
    total_sales: {
        type: String
    },
    net_sales: {
        type: String
    },
    average_sales: {
        type: String
    },
    total_orders: {
        type: Number
    },
    total_items: {
        type: Number
    },
    total_tax: {
        type: String
    },
    total_shipping: {
        type: String
    },
    total_refunds: {
        type: Number
    },
    total_discount: {
        type: Number
    },
    totals_grouped_by: {
        type: String
    },
    totals: {
        type: [{
            created: {
                type: Date,
                default: Date.now
            },
            sales: {
                type: String
            },
            orders: {
                type: Number
            },
            items: {
                type: Number
            },
            tax: {
                type: String
            },
            shipping: {
                type: String
            },
            discount: {
                type: String
            },
            customers: {
                type: Number
            }
        }]
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

var TopSeller = new Schema({
    title: {
        type: String
    },
    product_id: {
        type: Number
    },
    quantity: {
        type: Number
    },

});

var CouponsTotals = new Schema({
    slug: {
        type: String
    },
    name: {
        type: String
    },
    total: {
        type: Number
    }
});

var CustomersTotals = new Schema({
    slug: {
        type: String
    },
    name: {
        type: String
    },
    total: {
        type: Number
    }
});

var OrdersTotals = new Schema({
    slug: {
        type: String
    },
    name: {
        type: String
    },
    total: {
        type: Number
    }
});

var ProductsTotals = new Schema({
    slug: {
        type: String
    },
    name: {
        type: String
    },
    total: {
        type: Number
    }
});

var ReviewsTotals = new Schema({
    slug: {
        type: String
    },
    name: {
        type: String
    },
    total: {
        type: Number
    }
});

mongoose.model("Report", ReportSchema);
mongoose.model("Topseller", TopSeller);
mongoose.model("Coupon", CouponsTotals);
mongoose.model("Customer", CustomersTotals);
mongoose.model("Order", OrdersTotals);
mongoose.model("Product", ProductsTotals);
mongoose.model("Review", ReviewsTotals);