const { generateOtp } = require('../utils');
const { UserModel } = require('../models');

exports.read = async (req, res) => {
  // UserModel.find({}).then(($, err) => {
  //   if (err) {
  //     res.status(400).send({ status: false, error: 'something went wrong' });
  //   } else {
  //     res.send({
  //       status: true,
  //       data: $
  //     })
  //   }
  // });
  try {
    const $ = await UserModel.find({});
    if (!$) {
      res.status(200).send({ status: false, error: 'no data found' });
    } else {
      res.send({
        status: true,
        data: $,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ status: false, error: 'something went wrong' });
  }
};

exports.create = async (req, res) => {
  const email = req.body.email;
  const age = req.body.age;

  const $ = await new UserModel({
    email,
    age,
  }).save();

  res.send({
    status: true,
    data: $,
    message: 'created',
  });
};

exports.updateById = async (req, res) => {
  const id = req.params.id;
  res.send('update by id ' + id);
};

exports.update = async (req, res) => {
  const email = req.body.email;
  const update_email = req.body.update_email;
  const $ = await UserModel.email.find(email);
  if ($) {
    $.email = update_email;
    res.send({ status: true });
  } else {
    res.send({ status: false });
  }
};

exports.deleteMe = (req, res) => {
  const otp = generateOtp();
  res.send('delete ' + otp);
};
