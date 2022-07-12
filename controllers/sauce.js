// Importation des packages
const fs    = require('fs');
const Sauce = require('../models/Sauce');

// RAPPEL des différentes méthodes utilisés pour la base de données MongoDb
// ( save )         permet de sauvegarder dans la base de données
// ( findOne )      permet de chercher un objet dans la base de données
// ( find )         permet de chercher tous les objets dans la base de données
// ( updateOne )    permet de modifier dans la base de données
// ( deleteOne )    permet de supprimer un objet dans la base de données

// CREATE SAUCE
exports.createSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    // Création de l'objet Sauce
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        userLiked: [],
        userDisliked: []
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
        .catch(error => res.status(400).json({ error }));
};

// MODIFY SAUCE
exports.modifySauce = (req, res) => {
    if (req.file) {
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                // Supprime l'ancienne image
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    const sauceObject = {
                        ...JSON.parse(req.body.sauce),
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
                        .catch(error => res.status(400).json({ error }));
                })
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        const sauceObject = { ...req.body };
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
            .catch(error => res.status(400).json({ error }));
    }
};

// DELETE ONE SAUCE
exports.deleteOneSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({message: 'Non autoriser'});
            } else {
                // Supprime l'image
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Sauce supprimée !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
};

// GET ONE SAUCE
exports.getOneSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

// GET ALL SAUCES
exports.getAllSauces = (req, res) => {
    Sauce.find().limit()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

// POST LIKE SAUCE
exports.postLikeSauce = (req, res) => {
    console.log(req.body);
    
    switch (req.body.like) {
        case 1 :
            Sauce.updateOne({ _id: req.params.id }, { $addToSet: { usersLiked: req.body.userId }, $inc: { likes: 1 }})
                .then(() => res.status(200).json({ message: 'Like ajouté !' }))
                .catch((error) => res.status(400).json({ error }))  
            break;
    
        case 0 :
            Sauce.findOne({ _id: req.params.id })
                .then((sauce) => {
                    if (sauce.usersLiked.includes(req.body.userId)) { 
                        Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 }})
                        .then(() => res.status(200).json({ message: 'Aucun like' }))
                        .catch((error) => res.status(400).json({ error }))
                    }
                    if (sauce.usersDisliked.includes(req.body.userId)) { 
                        Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 }})
                        .then(() => res.status(200).json({ message: 'Aucun like' }))
                        .catch((error) => res.status(400).json({ error }))
                    }
                })
                .catch((error) => res.status(400).json({ error }))
            break;
    
        case -1 :
            Sauce.updateOne({ _id: req.params.id }, { $addToSet: { usersDisliked: req.body.userId }, $inc: { dislikes: 1 }})
                .then(() => { res.status(200).json({ message: 'Dislike ajouté !' }) })
                .catch((error) => res.status(400).json({ error }))
            break;
            
        default:
        console.log(error);
    }
};