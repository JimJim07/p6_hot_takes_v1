const Sauce = require('../models/Sauce');

// ADD SAUCE IN MONGODB
exports.createSauce = (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
    .catch( error => res.status(400).json({ error }));
};

// ADD SAUCE IN CONSOLE.LOG
exports.createSauceLog = (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Sauce créé dans la console'
    });
};

// MODIFY SAUCE
exports.modifySauce = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

// DELETE ONE SAUCE
exports.deleteOneSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
};

// GET ONE SAUCE
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
};

// GET ALL SAUCES
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
};

// GET ALL SAUCES TEST
exports.getAllSaucesTest = (req, res, next) => {
    const sauces = [
      {
        _id: 'oeihfzeoi',
        name: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2FFAC.2Fcontent.2Fuploads.2F2017.2F01.2Fpiment-anti-vieillissement.2Ejpg/1200x1200/quality/80/crop-from/center/le-piment-rouge-nouvelle-arme-anti-vieillissement.jpeg',
        heat: 8,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        name: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        heat: 5,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(sauces)
};