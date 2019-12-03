'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Report = mongoose.model('Report');

var credentials,
    token,
    mockup;

describe('Report CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            total_sales: "14.00",
            net_sales: "4.00",
            average_sales: "2.00",
            total_orders: 3,
            total_items: 6,
            total_tax: "0.00",
            total_shipping: "10.00",
            total_refunds: 0,
            total_discount: "0.00",
            totals_grouped_by: "day",
            totals: [{
                sales: "14.00",
                orders: 3,
                items: 6,
                tax: "0.00",
                shipping: "10.00",
                discount: "0.00",
                customers: 0
            }]
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Report get use token', (done) => {
        request(app)
            .get('/api/reports')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                done();
            });
    });

    it('should be Report get by id', function (done) {

        request(app)
            .post('/api/reports')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/reports/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.total_sales, mockup.total_sales);
                        assert.equal(resp.data.net_sales, mockup.net_sales);
                        assert.equal(resp.data.average_sales, mockup.average_sales);
                        assert.equal(resp.data.total_orders, mockup.total_orders);
                        assert.equal(resp.data.total_items, mockup.total_items);
                        assert.equal(resp.data.total_tax, mockup.total_tax);
                        assert.equal(resp.data.total_shipping, mockup.total_shipping);
                        assert.equal(resp.data.total_refunds, mockup.total_refunds);
                        assert.equal(resp.data.total_discount, mockup.total_discount);
                        assert.equal(resp.data.totals_grouped_by, mockup.totals_grouped_by);
                        assert.equal(resp.data.totals[0].sales, mockup.totals[0].sales);
                        assert.equal(resp.data.totals[0].orders, mockup.totals[0].orders);
                        assert.equal(resp.data.totals[0].items, mockup.totals[0].items);
                        assert.equal(resp.data.totals[0].tax, mockup.totals[0].tax);
                        assert.equal(resp.data.totals[0].shipping, mockup.totals[0].shipping);
                        assert.equal(resp.data.totals[0].discount, mockup.totals[0].discount);
                        assert.equal(resp.data.totals[0].customers, mockup.totals[0].customers);
                        done();
                    });
            });

    });

    it('should be Report post use token', (done) => {
        request(app)
            .post('/api/reports')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.status, 200);
                assert.equal(resp.data.total_sales, mockup.total_sales);
                assert.equal(resp.data.net_sales, mockup.net_sales);
                assert.equal(resp.data.average_sales, mockup.average_sales);
                assert.equal(resp.data.total_orders, mockup.total_orders);
                assert.equal(resp.data.total_items, mockup.total_items);
                assert.equal(resp.data.total_tax, mockup.total_tax);
                assert.equal(resp.data.total_shipping, mockup.total_shipping);
                assert.equal(resp.data.total_refunds, mockup.total_refunds);
                assert.equal(resp.data.total_discount, mockup.total_discount);
                assert.equal(resp.data.totals_grouped_by, mockup.totals_grouped_by);
                assert.equal(resp.data.totals[0].sales, mockup.totals[0].sales);
                assert.equal(resp.data.totals[0].orders, mockup.totals[0].orders);
                assert.equal(resp.data.totals[0].items, mockup.totals[0].items);
                assert.equal(resp.data.totals[0].tax, mockup.totals[0].tax);
                assert.equal(resp.data.totals[0].shipping, mockup.totals[0].shipping);
                assert.equal(resp.data.totals[0].discount, mockup.totals[0].discount);
                assert.equal(resp.data.totals[0].customers, mockup.totals[0].customers);
                done();
            });
    });

    it('should be report put use token', function (done) {

        request(app)
            .post('/api/reports')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    total_sales: 'name update'
                }
                request(app)
                    .put('/api/reports/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.total_sales, update.total_sales);
                        assert.equal(resp.data.net_sales, mockup.net_sales);
                        assert.equal(resp.data.average_sales, mockup.average_sales);
                        assert.equal(resp.data.total_orders, mockup.total_orders);
                        assert.equal(resp.data.total_items, mockup.total_items);
                        assert.equal(resp.data.total_tax, mockup.total_tax);
                        assert.equal(resp.data.total_shipping, mockup.total_shipping);
                        assert.equal(resp.data.total_refunds, mockup.total_refunds);
                        assert.equal(resp.data.total_discount, mockup.total_discount);
                        assert.equal(resp.data.totals_grouped_by, mockup.totals_grouped_by);
                        assert.equal(resp.data.totals[0].sales, mockup.totals[0].sales);
                        assert.equal(resp.data.totals[0].orders, mockup.totals[0].orders);
                        assert.equal(resp.data.totals[0].items, mockup.totals[0].items);
                        assert.equal(resp.data.totals[0].tax, mockup.totals[0].tax);
                        assert.equal(resp.data.totals[0].shipping, mockup.totals[0].shipping);
                        assert.equal(resp.data.totals[0].discount, mockup.totals[0].discount);
                        assert.equal(resp.data.totals[0].customers, mockup.totals[0].customers);
                        done();
                    });
            });

    });

    it('should be report delete use token', function (done) {

        request(app)
            .post('/api/reports')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/reports/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be report get not use token', (done) => {
        request(app)
            .get('/api/reports')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be report post not use token', function (done) {

        request(app)
            .post('/api/reports')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be report put not use token', function (done) {

        request(app)
            .post('/api/reports')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/reports/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be report delete not use token', function (done) {

        request(app)
            .post('/api/reports')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/reports/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Report.remove().exec(done);
    });

});