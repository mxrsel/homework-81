import express from 'express';
import Link from '../models/Links';

const linkRouter = express.Router();

linkRouter.get('/', async (req, res, next) => {
    try {
        const links = await Link.find();
        return res.send(links);
    } catch (e) {
        next(e);
    }
});

linkRouter.get('/:id', async (req, res, next) => {
    try {
        const link = await Link.findById(req.params.id);

        if (!link) {
            return res.status(404).send({ error: 'Link not found' });
        }

        return res.redirect(link.originalUrl);
    } catch (e) {
        next(e);
    }
});

linkRouter.post('/', async (req, res, next) => {
    try {
        const { originalUrl } = req.body;
        const baseShortUrl = Math.random().toString(36).slice(2, 9);

        if (!originalUrl) {
            return res.status(400).send({ error: 'URL not found' });
        }

        const shortenUrl = baseShortUrl;

        const newLink = new Link({ originalUrl, shortenUrl });
        await newLink.save();

        return res.status(201).send(newLink);
    } catch (e) {
        next(e);
    }
});

export default linkRouter;