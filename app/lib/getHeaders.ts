import type { HashLinks } from '../lib/types';
import { useEffect, useState } from 'hono/jsx';

export const AddHashLinks = ({ headerContent, tagName }: HashLinks) => {
	useEffect(() => {
		if (headerContent.current) {
			const h2Elements = headerContent.current.getElementsByTagName(tagName);
			for (let i = 0; i < h2Elements.length; i++) {
				let id = (h2Elements[i] as HTMLElement).innerText;
				id = id.replace(/\s/g, '');
				h2Elements[i].id = id;
				h2Elements[i].innerHTML += `<a href="#${id}"> ##</a>`;
			}
		}
	}, []);
};

export const TocList = ({ headerContent, tagName }: HashLinks) => {
	const [tocHeaders, setTocHeaders] = useState<string[]>([]);
	const [innerText, setInnerText] = useState<string[]>([]);
	useEffect(() => {
		if (headerContent.current) {
			const h2Elements = Array.from(headerContent.current.getElementsByTagName(tagName));
			const text = h2Elements.map((h2Text) => {
				return (h2Text as HTMLElement).innerText;
			});
			setInnerText(text);
			const headers = h2Elements.map((element) => {
				let id = (element as HTMLElement).innerText;
				id = id.replace(/\s/g, '');
				element.id = id;
				return id;
			});
			setTocHeaders(headers);
		}
	}, []);
	return { tocHeaders, innerText };
};
