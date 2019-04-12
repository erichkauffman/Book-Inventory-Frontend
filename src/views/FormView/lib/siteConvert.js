export const siteConvert = (sites) => {
	let newSites = [];
	sites.sites.forEach((site, index) => {
		if(site){
			newSites.push({
				site: index,
				siteId: sites.ids[index]
			});
		}
	});
	return newSites;
}
