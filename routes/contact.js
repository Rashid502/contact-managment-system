const express = require("express");
const {
    check,
    validationResult
} = require("express-validator/check");
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");

const router = express.Router();

//@desc     Get Contacts
//@route    Get /api/contacts
//@access   private
router.get("/", auth, async (req, res, next) => {
    try {
        console.log(req.user);
        const contacts = await Contact.find({
            user: req.user,
        }).sort({
            datecreated: -1,
        });

        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(401).json({
            msg: "Server Error",
        });
    }
});

//@desc     Save Contact
//@route    Post /api/contacts
//@access   private
router.post(
    "/",
    [
        auth,
        [
            check("name", "Name is required").not().isEmpty(),
            check("email", "Email is required").isEmail(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        let {
            name,
            email,
            phone,
            type
        } = req.body;
        const newContact = new Contact({
            user: req.user,
            name,
            email,
            phone,
            type,
        });
        const contact = await newContact.save();
        res.json(contact);
    }
);

//@desc     Update Contact
//@route    PUT /api/contacts/:id
//@access   private
router.put(
    "/:id",
    [
        auth,
        [
            check("name", "Name is required").not().isEmpty(),
            check("email", "Email is required").isEmail(),
        ],
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        let {
            name,
            email,
            phone,
            type
        } = req.body;
        const updatedContact = new Contact({
            user: req.user,
            name,
            email,
            phone,
            type
        });

        console.log(req.body);
        console.log(req.params.id);
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!contact) {
            return res.status(400).json({
                success: false,
            });
        }
        res.status(201).json(contact);
    }
);
//@desc     Update Contact
//@route    PUT /api/contacts/:id
//@access   private
router.patch(
    "/favourite/add/:id",
    [
        auth,
        [
            check("name", "Name is required").not().isEmpty(),
            check("email", "Email is required").isEmail(),
        ],
    ],
    async (req, res, next) => {
        console.log("/favourite/add : " + req.params.id)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        let {
            name,
            email,
            phone,
            type,
            favorite
        } = req.body;
        const updatedContact = new Contact({
            name,
            email,
            phone,
            type,
            favorite
        });

        console.log(req.body);
        console.log(req.params.id);
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!contact) {
            return res.status(400).json({
                success: false,
            });
        }
        res.status(201).json(contact);
    }
);

//@desc     Delete contact
//@route    DELETE /api/contact/:id
//@access   private
router.delete("/:id", async (req, res, next) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(201).json({
        success: true,
        data: {},
    });
});

module.exports = router;