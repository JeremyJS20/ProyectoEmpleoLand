//Controladores routerDeleter

exports.deleteJobController = (req, res) => {
    console.log(req.body);
    res.send('Job Deleted');
}