import express from "express";
import Link from "../models/Links";
import {LinkMutation} from "../types";
import {vigenereCipher} from "../vigenereCipher";

const linkRouter = express.Router();


linkRouter.get('/', async(req, res, next) => {
    try{
        const links = await Link.find();
        return res.send(links);
    }catch (e) {
        next(e)
    }
});

linkRouter.get('/:id', async(req, res, next) => {
   try{
       const link = await Link.findById(req.params.id);

       if (link === null) {
           return res.status(404).send({error: 'Link not found'})
       }

       return res.status(301).redirect(link.originalUrl);
   } catch (e) {
       next(e)
   }
});

linkRouter.post('/', async(req, res, next) => {
try{
    const originalUrl = req.body.originalUrl;
    const baseShortUrl = req.body.shortenUrl;

    if (!originalUrl) {
        return res.status(400).send({error: 'URL not found'})
    }

    const shortenUrl = vigenereCipher(baseShortUrl, 'your-password', true);

    const linkMutation: LinkMutation = {
        originalUrl,
        shortenUrl,
    };

    const newLink = new Link(linkMutation);
    await newLink.save();

    return res.status(201).send(newLink);
}catch (e) {
    next(e)
}
})

export default linkRouter;