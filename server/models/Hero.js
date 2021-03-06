const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: { type: String },
    avatar: { type: String },
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
    //技能
    scores: {
        difficult: { type: Number },
        skills: { type: Number },
        attack: { type: Number },
        survive: { type: Number },
    },
    //技能描述
    skills: [
        {
            icon: { type: String },
            name: { type: String },
            description: { type: String },
            tips: { type: String },
        }],
    items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],//顺风出装
    items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],//逆风出装
    usageTips: { type: String },
    battleTips: { type: String },
    teamTips: { type: String },
    //英雄关系
    partners: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
        description: { type: String }
    }],


})
module.exports = mongoose.model("Hero", schema)