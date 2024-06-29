#! /usr/bin/env node

console.log(
    'This script populates some categories, items to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

import Admin from "./models/admin.js";
import Category from "./models/category.js";
import Item from "./models/items.js";

const admin = [];
const category = [];
const item = [];

import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createAdmin();
    await createCategory();
    await createItem();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function adminCreate(index, username, password ) {
    const adm = new Admin({ username: username, password: password });
    await adm.save();
    admin[index] = adm;
    console.log(`Added admin: ${username}`);
}

async function categoryCreate(index, name, description) {
    const categoryDetail = { name: name, description: description };
    const cat = new Category(categoryDetail);

    await cat.save();
    category[index] = cat;
    console.log(`Added category: ${name}`);
}

async function itemCreate(index, name, description, category, price, number_in_stock) {
    const itemdetail = {
        name: name,
        description: description,
        category: category,
        price: price,
        number_in_stock: number_in_stock
    };

    const itm = new Item(itemdetail);
    await itm.save();
    item[index] = itm;
    console.log(`Added item: ${name}`);
}

async function createAdmin() {
    console.log("Adding admin");
    await Promise.all([
        adminCreate(0, "Roland", "12345678"),
    ]);
}

async function createCategory() {
    console.log("Adding Category");
    await Promise.all([
        categoryCreate(0,
            "Phones",
            "Phones are mobile devices that allow you to make and receive calls, send text messages, browse the internet, and use a variety of apps. They come in a variety of shapes and sizes, with features to suit all needs and budgets."
        ),
        categoryCreate(1,
            "Laptops",
            "Laptops are portable computers that are designed to be easy to carry and use on the go. They typically have a built-in screen, keyboard, touchpad, and speakers. Laptops are a great option for people who need to work or stay connected while they are away from home or office."
        ),
        categoryCreate(2,
            "Keyboards",
            "Keyboards are essential input devices for computers and other electronic devices.  They allow you to enter text, numbers, and symbols by pressing down on keys. There are many different types of keyboards available, each with its own advantages and disadvantages.",
            
        ),
        categoryCreate(3,
            "Mouse",
            "A mouse is a handheld pointing device that detects two-dimensional motion relative to a surface. This motion is typically translated into the motion of a pointer (called a cursor) on a display, which allows a smooth control of the graphical user interface (GUI) of a computer."
        ),
        categoryCreate(4,
            "Headsets",
            "Headsets are devices that combine headphones with a microphone, allowing you to listen to audio and communicate hands-free. They are commonly used for phone calls, video conferencing, gaming, and listening to music"
        ),
    ]);
}

async function createItem() {
    console.log("Adding items");
    await Promise.all([
        itemCreate(0, "Samsung A15", "This is a beautiful phone. Good for taking cameras", category[0], 40, 120),
        itemCreate(1, "iPhone 13 Pro Max", "168 MP. High storage medium. Can stay for a longer period of time", category[0], 1999, 5),
        itemCreate(2, "Dell Latitude e7440", "Suitable for programming. It has 8GB RAM, 256 SSD storage", category[1], 250, 14),
        itemCreate(3, "Ergonomic keyboard", "Fascinating in hand. Good for gamers", category[2], 89, 200),
        itemCreate(4, "Rat mouse", "Funny name. suitable for rat lovers", category[3], 30, 550),
        itemCreate(5, "Oraimo", "Black color, good bass. and has a good hearing aid", category[4], 15, 40),
        itemCreate(6, "iPod", "White color, 2 pieces. Best for travellers", category[4], 55, 100),
        itemCreate(7, "Samsung pod", "Suitable for lovers of quality items", category[4], 39, 3),
    ]);
}
