const getByQueryParamsFactory = (elementModel) => async (req, res) => {
  try {
    const {
      sort: sortQuery,
      select: selectQuery,
      page,
      limit,
      filter,
    } = req.query;
    const skip = (page - 1) * limit;

    let queryResPromise = elementModel.find();
    if (sortQuery) {
      const [sortParams, order] = sortQuery.split(" ");
      if (order === "asc") {
        queryResPromise = queryResPromise.sort(sortParams);
      } else {
        queryResPromise = queryResPromise.sort(`-${sortParams}`);
      }
    }

    if (selectQuery) {
      queryResPromise = queryResPromise.select(selectQuery);
    }

    if (limit) {
      queryResPromise = queryResPromise.skip(skip).limit(limit);
    }

    const filterObj = JSON.parse(filter);
    console.log(filterObj);
    if (filterObj) {
      queryResPromise = queryResPromise.find(filterObj);
    }

    const result = await queryResPromise;
    res.status(200).send({
      message: "Sorted Successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllFactory = (elementModel) => async (req, res) => {
  try {
    const data = await elementModel.find();

    res.send({
      message: "Data found",
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const createFactory = (elementModel) => async (req, res) => {
  try {
    const payload = req.body;
    const data = await elementModel.create(payload);

    res.send({
      message: "Added successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const getElementByIdFactory = (elementModel) => async (req, res, next) => {
  try {
    const { id } = req.params;
    const element = await elementModel.findById(id);

    if (!element) {
      res.send({
        message: "Not found",
      });
    }

    res.send({
      message: "Successful",
      data: element,
    });
  } catch (error) {
    // res.status(500).send({
    //   message: error.message,
    // });
    next(error);
  }
};

const updateElementByIdFactory = (elementModel) => async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const element = await elementModel.findByIdAndUpdate(id, payload, {
      new: true,
    });

    res.send({
      message: "Updated successfully",
      data: element,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const deleteElementByIdFactory = (elementModel) => async (req, res) => {
  try {
    const { id } = req.params;
    const element = await elementModel.findByIdAndDelete(id);

    res.send({
      message: "Deleted successfully",
      data: element,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export {
  getByQueryParamsFactory,
  getAllFactory,
  createFactory,
  getElementByIdFactory,
  updateElementByIdFactory,
  deleteElementByIdFactory,
};
