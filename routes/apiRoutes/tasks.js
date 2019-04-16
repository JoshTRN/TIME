const router = require('express').Router();
const { taskController } = require('../../controllers')

router.get("/", async (req, res) => {

    const [user, data] = await taskController.getAll(req.session.user)


    res.render("index", {
        data,
        photo: user.dataValues.picURL
    });
});

router.get("/completed", async (req, res) => {
        res.json(await taskController.getComplete(req.session.user));
});

router.get("/all", async (req, res) => {
    res.json(await taskController.getCategories(req.session.user));
});

router.get('/incomplete', async (req, res) => {
    res.json(await taskController.getIncomplete(req.session.user));
})

router.put("/update/:id", (req, res) => {
    taskController.updateStatus(req.params.id, req.session.user);
})

router.delete("/delete/:id", (req, res) => {
   taskController.deleteTask(req.params.id, req.session.user);
});

module.exports = router;