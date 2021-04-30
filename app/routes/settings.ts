import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { Query } from 'mongoose';
const router: express.Router = express.Router();

const Settings = require('./../models/settings');

interface SettingsObject {

}

router.get('/all', (req: Request, res: Response) => {
    Settings.find((error: Error, result: Query<SettingsObject>) => {
        if (error) {
            res.status(400).json(error);
        }

        res.status(200).json(result);
    });
});

router.get('/all/active', (req: Request, res: Response) => {
    Settings.find({ active: true }, (error: Error, result: Query<SettingsObject>) => {
        if (error) {
            res.status(400).json(error);
        }

        res.status(200).json(result);
    });
});

router.get('/:id',
(req: Request, res: Response) => {
    Settings.findById(req.params.id, (error: Error, result: Query<SettingsObject>) => {
        console.log(req.params.id)
        if (error) {
            res.status(400).json(error);
        }

        res.status(200).json(result);
    });
});

router.post('/new',
(req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.sendStatus(403);
    }
},
(req: Request, res: Response, next: NextFunction) => {
    console.log(`* route for POST to /settings/new`);
    next();
},
[
    body('siteHeader').trim(),
    body('bio').trim(),
    body('siteFooter').trim(),
    body('active')
],
(req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(`* validation errors:`);
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(`* creating Settings`)
    Settings.create({
        siteHeader: req.body.siteHeader,
        bio: req.body.bio,
        siteFooter: req.body.siteFooter,
        active: req.body.active
    }).then((settings: any) => {
        console.log(`* Settings created successfully:`)
        console.log(settings);
        return res.status(201).json({ success: `Settings created successfully.`, settings: settings });
    }).catch((err: any) => {
        console.log(`* Settings creation error`)
        return res.status(400).json({ errors: err })
    });
});

router.post('/update/:id',
(req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.sendStatus(403);
    }
},
[
    body('siteHeader').trim(),
    body('bio').trim(),
    body('siteFooter').trim(),
    body('active')
],
(req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(`* validation errors:`);
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(`* updating Settings`)
    Settings.findByIdAndUpdate({ _id: req.params.id }, {
        siteHeader: req.body.siteHeader,
        bio: req.body.bio,
        siteFooter: req.body.siteFooter,
        active: req.body.active
    }).then((settings: any) => {
        console.log(`* Settings updated successfully:`)
        console.log(settings);
        return res.status(200).json({ success: `Settings updated successfully.`, settings: settings });
    }).catch((err: any) => {
        console.log(`* Settings update error`)
        return res.status(400).json({ errors: err })
    });
});

router.post('/delete/:id',
(req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.sendStatus(403);
    }
},
(req: Request, res: Response) => {
    Settings.findByIdAndDelete({ _id: req.params.id })
    .then((settings: any) => {
        console.log(`* Settings deleted successfully:`)
        console.log(settings)
        return res.status(200).json({ success: `Settings deleted successfully.`, settings: settings });
    }).catch((err: any) => {
        console.log(`* Error deleting settings`);
        return res.status(400).json({ error: `Error deleting settings` , errors: err });
    });
});

module.exports = router;