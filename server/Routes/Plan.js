import express from 'express'
import filter from '../Middleware/Middleware.js';
import Plan from '../Model/Plans.js';
const router = express.Router();

router.post('/create-plan', filter, async (req, res) => {
    try {
        const { subscribe, type, paymentInfo, isActive } = req.body;

        const present = await Plan.find({ user: req.user.id });
        if (present.length !== 0) {
            return res.json({ plan: present[0] });
        }
        const plan = await Plan.create({
            isActive, user: req.user.id, type, paymentInfo, subscribe
        });
        res.json({plan:plan})
    } catch (error) {
        console.log(error);
        res.status(500).send("internal server error")
    }
})
router.post('get-plan', filter, async (req, res) => {
    try {
        const plan = await Plan.find({ user: req.user.id });
        res.send(plan[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send("internal server error")
    }
})
router.put("/update-plan/:id", filter, async (req, res) => {
  try {
    const { subscribe, type, paymentInfo, isActive } = req.body;
   
    const present = await Plan.findById(req.params.id);
    if (!present) {
        return res.send("Not found");
      }
      if (present.user.toString() !== req.user.id) 
      {
          return res.send("unauthorized");
      }
      const updated={
      isActive,
      user: req.user.id,
      type,
      paymentInfo,
      subscribe,
    }
    const plan = await Plan.findByIdAndUpdate(req.params.id,{$set:
     updated
    }, {new:true});
    res.json({ plan: plan });
  } catch (error) {
    console.log(error);
    res.status(500).send("internal server error");
  }
});

export default router