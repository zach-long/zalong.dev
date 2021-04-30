import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { Query } from 'mongoose';
// import passport from 'passport';
const router: express.Router = express.Router();

const Skill = require('./../models/skill');

interface SkillObject {

}

router.get('/all', (req: Request, res: Response) => {
    Skill.find((error: Error, result: Query<SkillObject>) => {
        if (error) {
            res.status(400).json(error);
        }

        res.status(200).json(result);
    });
});

router.get('/:id',
(req: Request, res: Response) => {
    Skill.findById(req.params.id, (error: Error, result: Query<SkillObject>) => {
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
[
    body('name').trim(),
    body('description').trim(),
    body('level').trim()
],
(req: Request, res: Response) => {
    console.log(`* body:`)
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(`* validation errors:`);
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(`* creating Skill`)
    Skill.create({
        name: req.body.name,
        description: req.body.description,
        level: req.body.level
    }).then((skill: any) => {
        console.log(`* Skill created successfully:`)
        console.log(skill);
        return res.status(201).json({ success: `Skill created successfully.`, skill: skill });
    }).catch((err: any) => {
        console.log(`* Skill creation error`)
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
    body('name').trim(),
    body('description').trim(),
    body('level').trim()
],
(req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(`* validation errors:`);
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(`* updating Skill`)
    Skill.findByIdAndUpdate({ _id: req.params.id }, {
        name: req.body.name,
        description: req.body.description,
        level: req.body.level
    }).then((skill: any) => {
        console.log(`* Skill updated successfully:`)
        console.log(skill);
        return res.status(200).json({ success: `Skill updated successfully.`, skill: skill });
    }).catch((err: any) => {
        console.log(`* Skill update error`)
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
    Skill.findByIdAndDelete({ _id: req.params.id })
    .then((skill: any) => {
        console.log(`* Skill deleted successfully:`)
        console.log(skill)
        return res.status(200).json({ success: `Skill deleted successfully.`, skill: skill });
    }).catch((err: any) => {
        console.log(`* Error deleting skill`);
        return res.status(400).json({ error: `Error deleting skill` , errors: err });
    });
});

module.exports = router;