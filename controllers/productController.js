export const index = (req, res, next) => {
    res.send("index Route")
}

export const category_create_get = (req, res, next) => {
    res.render("category_form", {title: "Create New Product Category"})
}

export const category_create_post = (req, res, next) => {
    res.send("Category creation form")
}

export const category_delete_get =(req, res, next) => {
    res.send("Category deletion")
}

export const category_update_get = (req, res, next) => {
    res.send("Update category get")
}

export const category_update_post = (req, res, next) => {
    res.send("Category update form")
}

export const category_one_get = (req, res, next) => {
    res.send("Get a specific category")
}

export const category_all_get = (req, res, next) => {
    res.send("Get all category")
}