// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
const url = `https://homeinfoserver.herokuapp.com/api/waste`
const req = new Request(url)
const res = await req.loadJSON()

if (config.runsInWidget) {
    // create and show widget
    let widget = createWidget(res.type, res.day, res.dateSimple, res.color)
    Script.setWidget(widget)
    Script.complete()
} else {
    // make table
    let table = new UITable()

    // fill data
    table.addRow(createRow("Type", res.type))
    table.addRow(createRow("Date", res.dateSimple))
    table.addRow(createRow("Day", res.day))

    // present table
    table.present()
}

function createRow(title, text) {
    let row = new UITableRow()
    row.addText(title)
    row.addText(text).rightAligned()
    return row
}

function createWidget(pretitle, title, subtitle, color) {
    let w = new ListWidget()
    w.backgroundColor = new Color(color)
    let preTxt = w.addText(pretitle.toUpperCase())
    preTxt.textColor = Color.white()
    preTxt.font = Font.systemFont(30)
    w.addSpacer(5)
    let titleTxt = w.addText(title.toUpperCase())
    titleTxt.textColor = Color.white()
    titleTxt.textOpacity = 0.8
    titleTxt.font = Font.systemFont(22)
    w.addSpacer(5)
    let subTxt = w.addText(subtitle)
    subTxt.textColor = Color.white()
    subTxt.textOpacity = 0.8
    subTxt.font = Font.systemFont(22)
    return w
}
