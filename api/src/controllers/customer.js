const { Customer } = require("../models/customer");

const getAll = async (req, res) => {
  console.log(req.user);

  const customers = await Customer.find();
  res.json(customers);
};

const getOne = async (req, res) => {
  const { customerId } = req.params;

  const customer = await Customer.findById(customerId);
  if (!customer) {
    return res.status(404).json({ message: "Cliente no encontrado" });
  }

  res.json(customer);
};

const create = async (req, res) => {
  const newCustomer = await Customer.create({
    ...req.body,
  });
  res.json(newCustomer);
};

const update = async (req, res) => {
  const { customerId } = req.params;

  const updates = { ...req.body };
  const oldCustomer = await Customer.findByIdAndUpdate(customerId, updates);
  if (!oldCustomer) {
    return res.status(404).json({ message: "Cliente no encontrado" });
  }
  const updatedCustomer = { customerId, ...updates };

  res.json(updatedCustomer);
};

const deleteOne = async (req, res) => {
  const { customerId } = req.params;
  const deletedCustomer = await Customer.findByIdAndDelete(customerId);
  if (!deletedCustomer) {
    return res.status(404).json({ message: "Cliente no encontrado" });
  }

  res.json(deletedCustomer);
};

module.exports = { getAll, getOne, create, update, deleteOne };
