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
    let preTxt = w.addText("🗑️ ")
    preTxt.textColor = Color.white()
    preTxt.font = Font.systemFont(28)
    w.addSpacer(5)
    let preTxt2 = w.addText(pretitle.toUpperCase())
    preTxt2.textColor = Color.white()
    preTxt2.font = Font.systemFont(28)
    let titleTxt = w.addText(title.toUpperCase() + " " + subtitle)
    titleTxt.textColor = Color.white()
    titleTxt.textOpacity = 0.6
    titleTxt.font = Font.systemFont(22)
    w.addSpacer(5)
    return w
}
