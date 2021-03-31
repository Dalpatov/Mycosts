const Task = require('../../db/models/task/index');

 module.exports.createNewTask = (req, res) => {
  const task = new Task({
    text: req.body.text,
    date: req.body.date,
    value: req.body.value,  
  });
    task.save().then(result => {
      Task.find().then(result => {
        res.send({data:result});
      });
    });
 };
module.exports.deleteTask = (req, res) => {
  Task.deleteOne({_id: req.query._id}).then(result => {
    Task.find().then(result => {
        res.send({data:result});
    });
  });
}

  module.exports.changeTaskInfo = (req, res) => {
    Task.updateOne({_id: req.body._id}, req.body).then(result => {
       Task.find().then(result => {
        res.send({data:result});

    });     
  });
};

  module.exports.getAllTasks = (req, res) => {
    Task.find().then(result => {
      res.send({data:result});
  })
}
