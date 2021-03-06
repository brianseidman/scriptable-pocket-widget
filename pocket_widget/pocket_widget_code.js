let textRowSize = new Size(250, 0),
	grayColors = Color.dynamic(Color.lightGray(), Color.darkGray()),
	grayFillerTitle = Color.dynamic(new Color("#E3E3E3"), new Color("#2A2A2A")), 
	grayFillerCompany = Color.dynamic(new Color("#ECECEC"), new Color("#2A2A2A")),
	fillerTitleSize = new Size(225, 14),
	fillerCompanySize = new Size(150, 12)

module.exports.data = async (components) => {
	let url = "https://getpocket.com/v3/get?access_token=" + components.accessToken + "&consumer_key=" + components.consumerKey + "&detailType=simple&state=unread&favorite=" + components.favorite + "&count=2"

	let req = new Request(url);
	req.method = "POST";

	let json = await req.loadJSON(),
		values = Object.values(json.list)

	return values
	}

module.exports.propertyCheck = (session, key) => {
	if (session.hasOwnProperty(key)) {
		return true
	} else {
		return false
	}
}

module.exports.horizontalRule = (widget) => {

 	widget.addSpacer(5)

	let hr = widget.addStack()
	hr.backgroundColor = grayFillerCompany //!!!
	hr.size = new Size(310, 1)
	
 	widget.addSpacer(8)
}

module.exports.filler = (widget, amount) => {

	if (amount == 0) {
		widget.addSpacer(5)
	} else {
		module.exports.horizontalRule(widget)
	}

	let entryFiller = widget.addStack()

	let fillerStackLeft = entryFiller.addStack()
	fillerStackLeft.size = textRowSize
	fillerStackLeft.layoutVertically()

	let fillerTitle = fillerStackLeft.addStack()
	let fillerText = fillerTitle.addText(" ")
	fillerTitle.backgroundColor = grayFillerTitle
	fillerTitle.size = fillerTitleSize
	fillerTitle.cornerRadius = cornerRadius

 	 fillerStackLeft.addSpacer(5)

	let fillerCompany = fillerStackLeft.addStack()
	let fillerCompanyText = fillerCompany.addText(" ")
	fillerCompany.backgroundColor = grayFillerCompany
	fillerCompany.size = fillerCompanySize
	fillerCompany.cornerRadius = cornerRadius

 	entryFiller.addSpacer()

	let fillerImage = entryFiller.addStack()
	fillerImage.size = imageSize
	fillerImage.cornerRadius = cornerRadius
	fillerImage.backgroundColor = grayFillerTitle
}

module.exports.articleEntries = async (widget, data) => {
	fontArticle = Font.semiboldSystemFont(12),
	lineLimit = 2,
	fontCompany = Font.regularRoundedSystemFont(10),
	grayAttribution = new Color("#949494"),
	imageSize = new Size(40, 40),
	cornerRadius = 5,
	containerRelativeShape = false
	
	if (data.length == 0) {
		for (mi = 0; mi < 2; mi++) {
			module.exports.filler(widget, mi)
			}
		}

	for (ix = 0; ix < data.length; ix++) {

		let title = module.exports.propertyCheck(data[ix], 'resolved_title'),
			company = module.exports.propertyCheck(data[ix], 'domain_metadata')
			image = module.exports.propertyCheck(data[ix], 'top_image_url'),
			min = module.exports.propertyCheck(data[ix], 'time_to_read')

		if (ix > 0) {
			module.exports.horizontalRule(widget)
		}

		let entryStack = widget.addStack(),
			textStackLeft = entryStack.addStack()
			textStackLeft.layoutVertically()
			textStackLeft.size = textRowSize

		if (title) {
			let textTitle = textStackLeft.addText(data[ix].resolved_title)
			textTitle.font = fontArticle
			textTitle.lineLimit = lineLimit
		}

		if (company) {
			textCompany = data[ix].domain_metadata.name
 			textStackLeft.addSpacer(3)

			if (min) {
				var lineCompany = textStackLeft.addText(textCompany + " ??? " + data[ix].time_to_read + " min read")
			} else {
				var lineCompany = textStackLeft.addText(textCompany)
			}

			lineCompany.font = fontCompany
			lineCompany.lineLimit = lineLimit
			lineCompany.textColor = grayAttribution
		}

		entryStack.addSpacer()

		let imageStack = entryStack.addStack()
		imageStack.size = imageSize
		imageStack.cornerRadius = cornerRadius

		if (image) {
			let loadImage = await (new Request(data[ix].top_image_url)).loadImage()
			imageContainer = imageStack.addImage(loadImage)
			imageContainer.containerRelativeShape = containerRelativeShape
			imageContainer.applyFillingContentMode()
		}
		
		if (data.length == 1) {
			module.exports.filler(widget)
		} 
	}
}

module.exports.titleLine = (widget, value) => {

	let crimson = new Color('#DC5059'),
	fontTitle = Font.mediumSystemFont(12),
	fontArticle = Font.semiboldSystemFont(12),
	fontCompany = Font.regularRoundedSystemFont(10)

	let titleStack = widget.addStack()
	titleStack.layoutHorizontally()
	titleStack.centerAlignContent()
	
	let imageLogo = titleStack.addImage(module.exports.logoImg())
	imageLogo.imageSize = new Size(12, 12)

	if (value == 0) {
	var text = "Unread"
	} else {
	var text = "Favorites"
	}
	
	let titleText = titleStack.addText("  " + text)
	titleText.font = fontTitle
	titleText.textColor = crimson

	widget.addSpacer(4)
}

module.exports.logoImg = () => {
	let logo = "iVBORw0KGgoAAAANSUhEUgAAAcAAAAGQCAYAAAA5q7CEAAAACXBIWXMAABYlAAAWJQFJUiTwAAAFz2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuZGFiYWNiYiwgMjAyMS8wNC8xNC0wMDozOTo0NCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjAgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTA0LTAxVDEzOjM0OjIwLTA1OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0xMS0wM1QxMjowOTo0Mi0wNTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0xMS0wM1QxMjowOTo0Mi0wNTowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDM1OGNlNmUtNGI5Ny00YzFjLTkyMTAtYWUzNDMyNmQzOTI2IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YjFkYTdhYmEtMDNlMS1mYzRjLTg2ZGMtZjMzNGE4ZmQ3MTY0IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MDNlNDI4OGQtNGY0My00YzY4LWEwYWMtMjA2ZWQzZjBjODZkIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowM2U0Mjg4ZC00ZjQzLTRjNjgtYTBhYy0yMDZlZDNmMGM4NmQiIHN0RXZ0OndoZW49IjIwMjAtMDQtMDFUMTM6MzQ6MjAtMDU6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMy4wIChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowMzU4Y2U2ZS00Yjk3LTRjMWMtOTIxMC1hZTM0MzI2ZDM5MjYiIHN0RXZ0OndoZW49IjIwMjEtMTEtMDNUMTI6MDk6NDItMDU6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMy4wIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsNHd+kAAB/VSURBVHic7d1tbFzXeeDxZ8QXRZpROFtUgJDWFQtLrRN9ML1AtgSylZUR0iDVluZCnRR2kBHdrg3ZQhvGrBokq+3edNkUqUKHSmFbayHNaAxbgAcCRiyooC04GGlbhEmDaJhdBW0ko8MVGmihL8NoRrL4Iu6HuUPTMim+zLn3nHPP/wcYcZzkzIPY1F/nzr33xBYXFwUAANds0T0AAAA6EEAAgJMIIADASQQQAOAkAggAcBIBBAA4iQACAJxEAAEATiKAAAAnEUAAgJMIIADASQQQAOAkAggAcFK77gFUqqbSB/w/TYpIj7ZBACB6qiJS9v+8kizmK9omUSRm43FI1VS6W0QOSCNyzT+6dM0DAI6akkYUyyJSShbzZZ3DbJQ1Aaym0j0iMiCN8D2ucxYAwIqmRaQkItlkMV/SO8rajA5gNZVOSiN6gyKyW+csAIANmRaRrIiMJov5qt5RVmZkAP1LnJ6IHNE7CQBAgbMi4pn2vaFRAfR3fKNC+AAgik5JI4RV3YOIGBTAairtSeNSJzezAEB0zYjIQLKYL+geRHsA/ZtbssKNLQDgkgvSCGFV1wBaH4SvptKDInJFiB8AuOYpEakse347dFp2gP53fVlp/B8AAHDbs8liPhv2h4YeQD9+JWHXBwB4z9lkMT8Q5geGegnU/76vIsQPAPB+R6qpdDbMDwwtgH78SsJdngCAlYUawVACSPwAAOt0pJpKj4bxQYF/B8h3fgCATQj8xpgwdoAFIX4AgI35jn/1MDCBBtDfxj4Z5GcAACKr4F9FDERgAfQfbvxCUOsDACJvtzQORghEIN8B+sWuCDe9AABa98kgzhcMagfoCfEDAKiRDWJR5QH0v7Tk0icAQJXd/olBSgWxAxwNYE0AgNsGVd8QozSA/o0v3PUJAFCtSxpnxiqjegfoKV4PAICmAZWLKQtgNZXuFnZ/AIDg7K6m0gOqFlO5AxxUuBYAACvpV7WQygAOKFwLAICVPKXqZhglAaym0v3Cc38AgHD0q1hE1Q6wX9E6AACspV/FIqoCeEDROgAArOWAikVaDqB/9+fu1kcBAGBdulQclaRiB9jyEAAAbFBPqwsQQACAjXpaXUBFAA8oWAMAgI3oaXUBFQFMKlgDAICNSLa6gIoAPq5gDQAANqLl9gR1IC4AAEYjgAAAJxFAAICTCCAAwEkEEADgJAIIAHASAQQAOIkAAgCcRAABAE4igAAAJxFAAICTCCAAwEkEEADgJAIIAHASAQQAOIkAAgCcRAABAE4igAAAJxFAAICTCCAAwEkEEADgJAIIAHASAQQAOIkAAgCcRAABAE4igAAAJxFAAICTCCAAwEkEEADgJAIIAHASAQQAOIkAAgCcRAABAE4igAAAJxFAAICTCCAAwEkEEADgJAIIAHASAQQAOIkAAgCcRAABAE4igAAAJxFAAICTCCAAwEkEEADgJAIIAHASAQQAOIkAAgCcRAABAE4igAAAJxFAAICTCCAAwEkEEADgJAIIAHASAQQAOIkAAgCcRAABAE4igAAAJxFAAICTCCAAwEkEEADgJAIIAHASAQQAOIkAAgCcRAABAE4igAAAJxFAAICTCCAAwEkEEADgpHbdAyBUuTX+80woUwBm4OfBcQQwupZ+uNt79l1p/+jeH8d+8Rdubf3Pn/nfK/2X577/o533f/b/vjF/5f/8xsL1f917/+atXf5/xC8CiIqcyPp+Hmb/7tKjizO3T81974f7F65X9i7W6gn/P+LnIUJii4uLLS1QTaVbWwAq5URE2vZ0X+v81JMXt6b/049aWWzu+z/aOTs+8dTcP/zgN/2/xA8/bJOLJeK1jid7i52fSV1s/9iv3d3sQrMXi4/dK3z3dxeuV/b6f4mfB82SxXyslf89AYyGXCwRr239nU+d/9BznysG8QH3zhV63z1X+Lz/O2F+8GG63JZdO29uO/bsqY5PfPxnqhd/98ybqXt/8/eH+XnQiwC6LRdLxGsferr/ja1P90+G8YH3zhV675558wX/3/KDD9PkYol4bdvRzF91/nbqn4P+MH5jqBcBdFdu62f73tp29PN/q+PDay95g/Plq08IP/QwR65jf+9E3Bta6+YW5ereSGbu8uRB4echVATQPbktu3bejP+PP/mvbY92z+scZPZi8bE733jty8IPPfTLbf/jF/4ijF3faubLV7vqf3rya+wGw0MA3ZLrPHRwbPvQ0fO6B2laeKfSXvuid4ofemiSiyXitcQ3vS/o/g1h0+3nj5/wb5Th5yFgrQaQB+Htkdv+xy/8hUnxExFpe7R7vmsseyyWiNdk7eeqAKViiXitayx7zJT4iYjseP3kcNue7mvCz4PxCKAdcnFv6ITOyztrIYIIWS6WiL8a/7PjX9E9yEqIoB0IoPlycW/oRMf+3hu6B1kLEURIcs2dX3vPvhndw6xmx+snh7fs2nlT+HkwFgE0W27rZ/vesiF+TV1j2WP80CNAS/HTPch6fPitV7+kewasjgCaK9fes++KrsccWvHht179Epd/EACr4te07bnPvSb8LBiJABoqlojXEi97o7rn2Cy+A4FiuS27dt60LX4iIluf7p/0fxZgGAJoptz2Lx37c91DtIoIQpFc257uazZfTtz+5T/8mvBzYBwCaKD2nn1Xgnh/oQ5EEC3Kte3pvrbj9ZPDugdpRduv/sr99p59V3TPgfcjgObJbfvD3/+W7iFUIoLYpEjEr8n/ueZnwCAE0DDtPfuutP3qr9zXPYdqRBAbFKn4ibALNBEBNEvuQ//lmf+pe4ig7Hj95HDnoYNjQgTxcLnOQwfHohS/pq2/1/em8M+/MTgR3iCxRLzWyoGdNmi+ym12fEKEdyXig4x7361KHb/x72/pngHvYQdokK2/86lI/tA/aPvQ0fPsBLGCSMevqeM//of/pXsGNBBAc+TaP/Hx7+keIixEEA9wIn4iIp2HDl4Q/rk3ApdADRL1y58P4nIofNa871YFLoOagwAawtW7w4ig85yKX1MsEa8t1uq6x3Ael0AN0f7RvT/WPYMu24eOnud9iU5yMn4iIrwazQwE0Ay5Lbt/eVr3EDptfbp/Mu4NnRAi6Apn4yfi9m94TUIADdH5W0++o3sG3Tr2994ggpGXiyXir+44c/IPXI2fiEjsF3+B7wENQABhFCIYaUvHGbU92j2vexid2n790evCP+PaEUAYhwhGkpVn+QXFtTu+TUUAYSQiGCnED0YigDBWM4KxRPxVIYS2yrXt6b5G/GAiAgijdezvvdE1lj0WS8RrQgRtE7kTHRAtBBBWIILWIX4PMf+Tn27TPQMIoDFm/+7So7pnMB0RtAbxW8PCv7yzR3jzkXYE0AyZxZnbXbqHsAERNF6uY3/vBPFbw/xCh+4RQACNMfe9H+7XPYMtiKCxcp2HDo7FvSH+vqyBn3czEEBDLFyv7NU9g02IoHGcOc5IBX7ezUAADbFYqyd0z2CbrrHsMf+lwkRQL+K3Qfy8m4EAGmT2YvEx3TPYZsfrJ4eJoFa5bc997jXit35z3//RTt0zoIEAmiNzr/Dd39U9hI2IoDa5uDd0YuvT/ZO6B7HJ7PjEU8IdoEYggAbhe4HNI4Khc/o4o1bM/cMPflP3DGgggIZ598ybKd0z2IoIhob4bdLcP/7TR3TPgPcQQLNk7v3N3x/WPYTNiGCgcrFE/NXEy94fEb/Neffs278vXP40BgE0zGKtnrh3rtCrew6b7Xj95HDH/t4JIYIqLZ3o0N6zb0b3MDZa+Nf/u4WvOcxCAM2Tefdc4fO6h7Bd3BvKdR46OCZEUAWOM1Lg7l/99R8Juz+jEEADLdbqibun3/i07jlst33o6Hki2DLip8B8+WrXfPnqE7rnwPsRQDNl7r099szCO5V23YPYjgi2JLdl186bxK91d/7yla8Iuz/jEEBzZer/7S//XPcQUUAENyXXtqf72offevVLugex3d3Tb3z6/s1bu3TPgQ8igAa7f/PWrjsjp7krVAEiuCEcZ6TIfPlq1723x54Rdn9G4hKb2TKz4xPS9pFd/8bbNlq3fejo+Vg8Xrv39pgIvyCthvgpVP/Tk18T/lkzFgE0X+bumTdlyy/t+jeevWrdtqOf/9v2j+39Sd0bEeEXpgfl2nv2XUm87I3qHiQKZvoGXuGl12bjEqgdMnVvZHju8uQjugeJgo79vTfi3tAJ4XLocrnOQwfHiJ8ay+LHb7IMRgDtQQQVIoLvw3FGChE/exBAu2Tq3sgwN8aoQQRFhPgpRfzsQgDtk5kdn+gjgmo4HkHip8h8+WoX8bMPN8HYKTM7PiEijTsbNc9ivWYE/RtjRNz4BYwTHRSZuzz5SN0bGRY3/rmJFHaA9mInqFDH/t4byWL+SCwRr0n0d4PETxHiZzcCaDciqFjXWPZYxCNI/BQhfvYjgPbLzI5P9NVe8gZ1DxIVEY1gToifMvfOFXqJn/0IYDRk5stXn7j9/PETugeJiohFMBdLxGvJYv4I8WvdnZHTh++eefMFIX7WI4DRkVm4XtlLBNWJSAQ5zkihOyOnD8+OT/QJ8YsEAhgtRFAxyyNI/BQiftFDAKOHCCrWNZY91ran+5rYFUHip1DtJW+Q+EUPAYwmIqjYjtdPDlsUwVzbnu5rxE+N288fP+Gf5k78IoYARldm4Xpl70zfwCu6B4kKSyLIcUYK3X7++ImF65W9QvwiiQBGW2axVk8QQXUMjyDxU4j4RR8BjD4iqJihESR+Cv38mRe/TvyijwC6gQgqZlgEc52HDo4RPzVm+gZeuX/z1i4hfpFHAN1BBBXb8frJ4faefVdEbwQ50UEhTnRwi4oATilYA+HILNbqiWoqfZaDddVIvOyNdh46OCZ6Ikj8FCJ+1pludQEVAawqWAPhyQinyyu1fejoeQ0RJH6KzF2efIT4WanS6gKcB+iuTN0bEV6OrEYzRP45jUH/Iprb9tznXtv6dP9kwJ8TeZzo4Da+A3QbO0GFQtoJ5uLe0Ani1zriBxUBrChYA/oQQYUCjiDHGSlC/CKh0uoCKi6BtjwEtMvUvRHhspoaAV0OJX6K8FLryKi0ugDfAaIpc/fMm7Lws5u/xI0Vrds+dPR8x8d7flD3RkRa+4U2F0vEa/E/O/6V9p59M4rGcxbxw3LcBYrlMrPjE313Rk4f1j1IFHTs770R94ZOyOYvhy6d6ED8Wkf8Iqfa6gIqAlhWsAbMQQQVaiGCHGekEPGLpHKrC3AXKFZCBBXaRASJn0K3nz9+gvhhJdwFitUQQYU2EMHcll07bxI/NTjRIdIqrS4QW1xcbHmKaird+iIwFacMKLTG7ff8f60Q8Yu2ZDEfa3UNVZdA+YI+ujhdXqGO/b03dpw5+QexRPxVef9ukPgpRPywHqoCWFa0DsxEBBVqe7R7vmsseyyWiNekEUHip9BM38ArxC/yLqlYhJtgsF5EULFmBNt79l0hfmrwUmtshKoAlhStA7MRQcW6xrLHEi97o7rniALi55SSikXYAWKjMgvXK3s5WBemWHin0k78sBnsALEZnC4PI8xdnnzk9nPHv71Yq78oxM8lJRWLqApgVdE6sAcRhFac6OC0qopFlDwHKMKzgA7jrSUIHfFzm4pnAEXUfgc4rXAt2IOdIEI1e7H4GPFzmrLWqAxgReFasMtSBOfLV7t0D4PoujNy+vCdb7z2ZSF+LquoWkhlAEsK14J9Mou1+ou1l7xvcbo8gsCJDvCVVS2kMoBVhWvBXpm6NzJMBKES8cMyFVULqQxgWeFasBsRhDLEDw8oq1pI2V2gItwJig/Ixb2hEx37e2/oHgR24qXWWMG/SxbzVRULqX4TDHeCYrlM3RsZnr1YfEz3ILAP8cMKZlTFT0R9AMuK14P9Mne+8dqXOVgXG0H8sIqyysUIIMLA6fJYN+KHhyipXKxd5WJCALG6zOz4hIiIbB86el7zLDAUL7XGGsoqFyOACBMRxKqIH9ahrHIxpXeBiohUU+mqiPA2EDxMrvPQwTEiiCbih3WYSRbzSZULBnEeYCmANREtmdnxib7aS96g7kGg13z5ahfxwzqVVS8YRADLAayJ6MnMl68+weny7pq7PPlI7SXvW5zlh3UqqV6QHSB0yixcr+wlgu7hOCNsQln1gsoDmCzmS6rXRKQRQccQP2xSSfWCQewARUSmAloX0UQEHXHvXKGX+GETplW+AaYpqACWAloX0UUEI+7OyOnDd8+8+YIQP2xcKYhFCSBMklm4XtnL6fLRw4kOaFEpiEUJIEyzdLq87kGgBvGDAqUgFlX+IHxTNZUui8jjgSwOF+RiiXitayx7TPcg2Ly6N5KZuzx5UIgfNm86Wcx3B7FwUDtAEXaBaA07Qcvdfv74CeIHBUpBLUwAYbKlCC68U1H93loEiBMdoFApqIUJIEyXWazVX7z93PFvz12efET3MFgb8YNipaAWDiyA/jMbl4JaH87J1L2RYSJotp8/8+LXiR8UmkoW85WgFg9yByjCLhBqEUGDzfQNvHL/5q1dQvygTinIxYMOYCHg9eEeImggTnRAQApBLh7YYxBN1VS6IiK7A/0QuCgX94ZOdOzvvaF7ENcRPwRE+fl/Dwp6ByjCZVAEI1P3Robvnn7j07oHcdXc5clHiB8CVAr6A8K4tbwgIkdC+By4J3Pv7TFZrNcTnC4fLk50QAgKQX9A4DvAZDFfCPoz4LTM7PhE352R04d1D+IK4oeQFIL+gDAugYqIXAjpc+AmIhgS4oeQTAVx/NGDwnq7RkFEngrps+CmzOz4hIiIcDk0GHdPv/Hpe2+PPSPED8HLhvEhYe0ACyF9DtyWmR2f6Kt7I/wCrdidkdOHiR9CVAjjQ0IJoL+V5TIowpCZuzx5kIN11eE4I4Qs0Le/LBfWDlCEXSDCw+nyihA/aJAN64MIIKKKCLbo9vPHTxA/aFAI64NCCyCXQaEBEdwkTnSAJqFd/hQJdwcowi4Q4SOCG0T8oFE2zA8LNYDJYj4rIjNhfiYgfgQ5XX5txA+aFcL8sLB3gCLsAqHH0unyugcx1UzfwCvEDxpdCPPyp4ieAGY1fCYgQgRXxUutYYBC2B8Y+HFIK+GIJGiWiyXita6x7DHdg5iA+MEAgR99tBIdO0ARdoHQi52gj/jBEAUdH0oA4aqlCLp4uvzc5clHqqn0WeIHQ4zq+FAtl0BFRKqpdEF4QTbM4NTp8pzoAMNMJ4v5bh0frGsHKMIuEObI1L2RYRd2gsQPBhrV9cHaAugflDut6/OBB0Q+gsQPBpoRjZshnTtAEXaBMEtkI3hn5PRh4gcDFcI4+HY1ugM4qvnzgQdl6t7I8OzF4mO6B1GFEx1gsFGdH67tJpimaiqdFZEjWocAPijXeejgmO2nyxM/GOxSspg/oHMA3TtAEXaBMFNmdnyi787I6cO6B9ks4gfDZXUPoH0HKCJSTaVLIvKk7jmAFVi5E+Sl1jCctkcflmvXPYAvKwQQZsrMjk+IiIgtESR+sEBW9wAiZlwCbR6TxCMRMJU1l0OJHywwI4Z89WVEAH2e7gGAh8jMjk/01b0RY8NC/GAJrY8+LGdSAAvCYbkwW2bu8uRBE0+XJ36wiKd7gCZjAuj/jmBU8xjAWjIL1yt7f/7Mi1/XPYiIyMI7lXYOsoVFzoZ96O3DGBNA36iwC4T5Mvdv3tpVTaXP3jtX6NU1xL1zhd7bzx3/9mKt/qIQP9jB0z3AckY8BrFcNZX2ROS/654DWKfcll07b27/k2Nfa+/ZF8pv3ub+8Z8+cveV73zh/s1bu4TwwR7aH3x/kIkBTIpIRUS69E4CbEiubU/3tQ8d+exfd3zi4z8L4gMIHyz3yWQxX9I9xHLGBVCEXSCslosl4rWOJ3uLnZ9JXWz/2K/dbWWx+Z/8dNvsd4u/PXdpMsXhtbCYcbs/EXMDmBR2gbBfTkSkvWfflfaP7v3xlt2/PN35W0++87D/wfxPfrpt4epPPzr3vR/uny9ffcL/y0QPtjNu9ydiaABF2AUiknLr/O8RPESJkbs/EXNehbaSUREZFHaBiA7CBhd5ugdYjWmPQSzhuUAAsN4FEy99NhkbQN+o8FwgANhqUPcAD2N0AP1d4KDmMQAAG2fUW19WYnQARTgpAgAs5ekeYC3GB9A3qHsAAMC6fdX03Z+IJQFMFvMFEbmkew4AwJqMOe9vLVYE0OfpHgAAsCbPlPP+1mLsg/ArqabSWRE5onsOAMCKppPFfLfuIdbLph2gSOO7QB6LAAAzDegeYCOsCiAPxwOAsYx+6H0lVgVQRCRZzHvCYxEAYJIZsfBufesC6BvQPQAAYMmoDY89PMiqm2CW44YYADCCVTe+LGfrDlCEG2IAwAQDugfYLGsD6N8Q42keAwBcZt2NL8tZG0ARkWQxPyq8IQYAdJgRi3d/IpYH0DcgXAoFgLBZ88aX1VgfQP/Oo1HNYwCASy75V+CsZn0ARZaeDZzSPQcAOMD6S59NkQigb0D3AADgAM/GZ/5WEpkAJov5soh8VfccABBhkbj02RSZAIosXQrlrlAAUC8ylz6bIhVA34BwVygAqBaZS59NkQug/zdoUPMYABAlF6J06bMpcgEUEUkW81kRuaB7DgCIgMhd+myKZAB9A8KxSQDQqn7bH3hfTWQD6P8NG9A8BgDY7JTN7/pcS2QDKCLi/43j0QgA2LipZDE/qHuIIEU6gCI8GgEAmzAjIv26hwha5APo6xcejQCA9RqI2iMPK3EigP73gf2axwAAG5xKFvMF3UOEIba4uKh7htBUU+lBEfmm7jkAwFBTyWK+R/cQYXFiB9jkP8h5VvccAGAgJ773W86pAPoGhaOTAOBB/S5877eccwFc9n0gN8UAQMMXo/y832qcC6DI0vtC+zWPAQAmOBvF93yuh5MBFFl6SP5Z3XMAgEZT4vDhAU7dBbqSaiqdFZEjuucAgJDNiEh3VN/zuR7O7gCbksX8gPCmGABumRGRAy7HT4QANvULd4YCcMdAspgv6x5CNwIo3BkKwCnPuvKml7UQQJ9/Z+gBIYIAouusf2A4hAC+j39JoF/zGAAQhLP+PQ/wEcAH8HgEgAhy+nGH1RDAFfiXCIgggCiYEu74XBEBXIUfwVO65wCAFkwL8VsVAXyIZDE/KJweAcBOM9J4wXVV9yCmIoBr8L80JoIAbNJ80L2sexCTEcB1IIIALEL81okArhMRBGAB4rcBBHADiCAAgxG/DSKAG0QEARiI+G0CAdwEIgjAIMRvkwjgJhFBAAYgfi0ggC0gggA0In4tIoAtIoIANCB+ChBABfwI8to0AGEgfooQQEX816bxAm0AQZoSkR7ip0ZscXFR9wyRUk2lB0TkO7rnABA5nOqgGDtAxfxTJD4pnCwPQJ1LQvyUYwcYkGoq3SMiJRHp0jsJAMtxkntA2AEGxL9G3y2NyxYAsBlfJX7BIYAB8i9XHBCRC3onAWChZ5PFvKd7iCjjEmhIqql0VkSO6J4DgPF4zCEk7ABD4l/G4DEJAA/TvNOzrHsQF7ADDBk3xwBYxQURGeBOz/AQQA2qqXS3iBRE5HG9kwAwxCn/ZRoIEZdANUgW8xVp3BzDO0QBt81I42aXQd2DuIgdoGa8OQZw1pQ0LnmWdQ/iKgJoAP97wYKI7NY7CYCQ8H2fAQigIaqpdFJEsiLylN5JAATsi8liflT3ECCAxqmm0oMi8k3dcwBQblpE+rnkaQ4CaCAuiQKRwyVPAxFAQ/mXREeFt8cANpsREY9LnmYigIarptL90vhukAfnAbtwl6fhCKAF/N1gQUSe1DsJgHX6Ki+yNh8BtIh/g4wn7AYBU01LY9dX0j0I1sabYCzif4/QI43ToQGY5ZSI9BA/e7ADtBS7QcAY7PosxQ7QUst2gxy2C+jDrs9i7AAjgDtFgdBxh2cEEMCI8O8U9UTkC3onASKN5/oihABGjP8WmVHhkQlAtQsiMugfZ4YIIIAR5R+zNCpcFgVaxU0uEUUAI4zLokBLZkRklAfao4sAOqCaSndL4yYZLosC63NWGpc7q7oHQXAIoEOqqfQBaVwWfVzvJICxLkkjfGXdgyB4BNBB/veDnnDcEtA0JY3wlXQPgvAQQIdxowwg09J4rCGrexCEjwA6zr9RZtD/gxDCFYQPBBANhBCOIHxYQgDxPoQQEUX48AEEECvyQ9gv3CwDuxE+rIoAYk3cNQoLTUnjIfas7kFgLgKIdfOfI/SEB+phrgvSCF9J9yAwHwHEhvlvlvGkcYmU7wmh24yIFKRxqbOidxTYhABi0/zvCQekccMMl0cRtmlpPMea5ZVl2AwCCCX8y6MDInJE7yRwwFlpRK+kexDYjQBCKXaFCAi7PShHABEY/3DeQeG7QmxO87u9UV5OjSAQQISimkr3SyOEXCLFWi6ISIFHGBA0AohQLXvAvl9EntI5C4xyQRq7vQKXOBEWAghtHojhAeEyqWuIHrQigDDGssukB4QbaKKo+Z1eSYgeDEAAYST/BpoD0ggib56x15S8F7yS3lGA9yOAMJ5/qfTAsj8e1zcN1jAtjeCVRKTEm1lgMgII6/ivYjsgIj1CEHUjeLAWAYT1lu0Qe5b9KzfUBKN5SbMsBA+WI4CIJP87xAf/IIobMyWN0JVFpMx3eIgaAghn+JdOu6WxS2z+OTfYNC5jVqSxs6tII3ZlfeMA4SCAcN6yMPaISFIagRSJVhybkSuLSNX/1wqhg8sIILAG/3JqUt7bNYq8F0kRvZdXp6QRNJH34ibS2M2JNHZzVQHwAQQQUMw/GmolPdII6XqU5b2YLVfhxhNADQIIAHDSFt0DAACgAwEEADiJAAIAnEQAAQBOIoAAACcRQACAkwggAMBJBBAA4CQCCABwEgEEADiJAAIAnEQAAQBOIoAAACf9f8+PPRDK1VMrAAAAAElFTkSuQmCC"
	return Image.fromData(Data.fromBase64String(logo))
	}
