/* eslint-disable no-unused-vars */
import {
    Advances, 
    Enrollments
} from "./advance.module.js"

// Queries Resolvers
const allAdvances = async (parent, args, context, info) => {
    const advances = await Advances.find();
    return advances;
};

const advaceById = async (parent, args, context, info) => {
    const advance = await Advances.findById(args._id);
    return advance;
};

// Mutations Resolvers
const addObservation = async (parent, args, context, info) => {
    let advance = await Advances.findOneAndUpdate(
        { _id: args.input.advaceById },
        { observations: args.input.observations },
        { new: true }
    );
    return advance;
};

const addAdvance = async (parent, args, context, info) => {
    let advance = new Advances({
        ...args.input,
        });
    advance = await advance.save();
    return advance;
};


const enrollment = async (parent, args, context, info) => {
    const enrollment = await Enrollments.findById(parent.enrollment_id);
    return enrollment;
};

export default {
    Query: {
        allAdvances,
        advaceById
    },
    Mutation: {
        addObservation,
        addAdvance
    },
    Advance: {
        enrollment
    }
}