import express from 'express';
import Property from '../models/Property.js';
import { auth, checkRole } from '../middleware/auth.js';

const router = express.Router();

// Get all properties (public)
router.get('/', async (req, res) => {
  try {
    const { propertyType, city, minPrice, maxPrice, status } = req.query;
    const query = {};

    if (propertyType) query.propertyType = propertyType;
    if (city) query['location.city'] = city;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (status) query.status = status;

    const properties = await Property.find(query)
      .populate('seller', 'name email phoneNumber')
      .sort({ createdAt: -1 });

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single property (public)
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('seller', 'name email phoneNumber');

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create property (seller only)
router.post('/', auth, checkRole(['seller']), async (req, res) => {
  try {
    const property = new Property({
      ...req.body,
      seller: req.user._id
    });

    const newProperty = await property.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update property (seller or admin)
router.put('/:id', auth, checkRole(['seller', 'admin']), async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Only allow seller to update their own properties unless they're an admin
    if (req.user.role !== 'admin' && property.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this property' });
    }

    Object.assign(property, req.body);
    const updatedProperty = await property.save();
    res.json(updatedProperty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete property (seller or admin)
router.delete('/:id', auth, checkRole(['seller', 'admin']), async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Only allow seller to delete their own properties unless they're an admin
    if (req.user.role !== 'admin' && property.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this property' });
    }

    await property.remove();
    res.json({ message: 'Property deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify property (admin only)
router.patch('/:id/verify', auth, checkRole(['admin']), async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    property.isVerified = true;
    property.status = 'active';
    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 