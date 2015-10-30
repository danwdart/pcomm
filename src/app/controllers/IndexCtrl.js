function sample() {
    return new Promise(
        (resolve,reject) => setTimeout(
            () => resolve('Hi'), 1000
        )
    );
}

export default async (req, res) => {
    let that = await sample();
    console.log(that);
    return res.send(that);
};