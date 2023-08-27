import express from 'express'
import filter from '../Middleware/Middleware.js';
import Plan from '../Model/Plans.js';
const router = express.Router();
router.post('/create-plan', filter, async (req, res) => {  
    try {
        console.log("entered into creating plan")
        console.log(req.body)
        const { subscribe, type, paymentInfo, isActive } = req.body;
        //  console.log("req.body is" `${req.body}`);
        const present = await Plan.find({ user: req.userId });
        console.log(req.userId);
        if (present.length !== 0) {
            return res.json({ plan: present[0] });
           
        }
        const plan = await Plan.create({
            isActive, user: req.userId, type, paymentInfo, subscribe
        });
        res.json({plan:plan})
    } catch (error) {
        console.log(error);
        res.status(500).send("internal server error")
    }
})
router.post('/get-plan', filter, async (req, res) => {
    console.log("plan get")
    try {
        console.log("entered into getplan");
        const plan = await Plan.find({ user: req.userId });
        res.send(plan[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send("internal server error")
    }
})
router.put("/update-plan/:id", filter, async (req, res) => {
    try {
      console.log("update going to be");
    const { subscribe, type, paymentInfo, isActive } = req.body;
    const present = await Plan.findById(req.params.id);
    if (!present) {
        return res.send("Not found");
      }
      if (present.user.toString() !== req.userId) 
      {
          return res.send("unauthorized");
      }
      const updated={
      isActive,
      user: req.userId,
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