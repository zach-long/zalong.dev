import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import multer from 'multer';
import { Query } from 'mongoose';
// import passport from 'passport';
const router: express.Router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

const Project = require('./../models/project');

interface ProjectObject {

}

router.get('/all', (req: Request, res: Response) => {
    Project.find((error: Error, result: Query<ProjectObject>) => {
        if (error) {
            res.status(400).json(error);
        }

        res.status(200).json(result);
    });
});

router.get('/all/active', (req: Request, res: Response) => {
    Project.find({ active: true }, (error: Error, result: Query<ProjectObject>) => {
        if (error) {
            res.status(400).json(error);
        }

        res.status(200).json(result);
    });
});

router.get('/:id',
(req: Request, res: Response) => {
    Project.findById(req.params.id, (error: Error, result: Query<ProjectObject>) => {
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
    console.log(`* route for POST to /project/new`);
    let uploadImage = upload.single('image');
    uploadImage(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
            console.log(`multer error:`)
            console.log(err);
            return res.status(400).json({ errors: err });
        } else if (err) {
            console.log(`error:`)
            console.log(err);
            return res.status(400).json({ errors: err });
        }
        console.log(`* image uploaded successfully`)
        next();
    });
},
[
    body('title').trim(),
    body('description').trim(),
    body('stack').trim(),
    body('url').isURL(),
    body('active')
],
(req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(`* validation errors:`);
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(`* creating Project`)
    Project.create({
        title: req.body.title,
        description: req.body.description,
        stack: req.body.stack,
        image: req.file.path,
        url: req.body.url,
        active: req.body.active
    }).then((project: any) => {
        console.log(`* Project created successfully:`)
        console.log(project);
        return res.status(201).json({ success: `Project created successfully.`, project: project });
    }).catch((err: any) => {
        console.log(`* Project creation error`)
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
(req: Request, res: Response, next: NextFunction) => {
    console.log(`* route for POST to /project/update/:id`);
    let uploadImage = upload.single('image');
    uploadImage(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
            console.log(`multer error:`)
            console.log(err);
            return res.status(400).json({ errors: err });
        } else if (err) {
            console.log(`error:`)
            console.log(err);
            return res.status(400).json({ errors: err });
        }
        console.log(`* image uploaded successfully`)
        next();
    });
},
[
    body('title').trim(),
    body('description').trim(),
    body('stack').trim(),
    body('url').isURL(),
    body('active')
],
(req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(`* validation errors:`);
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(`* updating Project`)
    Project.findByIdAndUpdate({ _id: req.params.id }, {
        title: req.body.title,
        description: req.body.description,
        stack: req.body.stack,
        image: req.file.path,
        url: req.body.url,
        active: req.body.active
    }).then((project: any) => {
        console.log(`* Project updated successfully:`)
        console.log(project);
        return res.status(200).json({ success: `Project updated successfully.`, project: project });
    }).catch((err: any) => {
        console.log(`* Project update error`)
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
    Project.findByIdAndDelete({ _id: req.params.id })
    .then((project: any) => {
        console.log(`* Project deleted successfully:`)
        console.log(project)
        return res.status(200).json({ success: `Project deleted successfully.`, project: project });
    }).catch((err: any) => {
        console.log(`* Error deleting project`);
        return res.status(400).json({ error: `Error deleting project` , errors: err });
    });
});

module.exports = router;