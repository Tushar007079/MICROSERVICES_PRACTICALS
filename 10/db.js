const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/microservices-demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    isbn: String,
});

const CustomerSchema = new mongoose.Schema({
    name: String,
    email: String,
});

const OrderSchema = new mongoose.Schema({
    customerId: mongoose.Schema.Types.ObjectId,
    bookId: mongoose.Schema.Types.ObjectId,
});

const Book = mongoose.model('Book', BookSchema);
const Customer = mongoose.model('Customer', CustomerSchema);
const Order = mongoose.model('Order', OrderSchema);

module.exports = {
    Book,
    Customer,
    Order,
};
