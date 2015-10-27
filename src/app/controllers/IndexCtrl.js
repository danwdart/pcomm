export default (req, res) => {

    let sample = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve('hi');
        }, 1000);
    });

    async () => {
        let that = await sample();
        console.log(that);
    }
    return res.send('Hello World!');
};
