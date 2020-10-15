// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
const url = `https://homeinfoserver.herokuapp.com/api/covid`
const req = new Request(url)
const res = await req.loadJSON()

if (config.runsInWidget) {
    // create and show widget
    let widget = createWidget(res.kreis, res.sevenVal)
    Script.setWidget(widget)
    Script.complete()
} else {
    // make table
    let table = new UITable()

    // fill data
    table.addRow(createRow("Kreis", res.kreis))
    table.addRow(createRow("sevenVal", res.sevenVal))

    // present table
    table.present()
}

function createRow(title, text) {
    let row = new UITableRow()
    row.addText(title)
    row.addText(text).rightAligned()
    return row
}

function createWidget(kreis, sevenVal) {
    let w = new ListWidget()
    w.backgroundColor = new Color("#1f76b0")
    let preTxt = w.addText("🦠" + Math.round(sevenVal).toString())
    preTxt.textColor = Color.white()
    preTxt.font = Font.systemFont(40)
    w.addSpacer(5)

    let titleTxt = w.addText(kreis)
    titleTxt.textColor = Color.white()
    titleTxt.textOpacity = 0.6
    titleTxt.font = Font.systemFont(16)
    w.addSpacer(5)
    return w
}
