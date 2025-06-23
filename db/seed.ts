import { db, Role, User, Product, ProductImage } from 'astro:db';
import { v4 as UUID } from 'uuid';
import bcrypt from 'bcryptjs';
import { seedProducts } from './seed-data';


// https://astro.build/db/seed
export default async function seed() {
	const roles = [
		{ id: 'admin', name: 'Administrador' },
		{ id: 'user', name: 'Usuario de sistema' },
	];

	const johnDoe = {
		id: 'ABC-123-JOHN', // UUID(),
		name: 'John Doe',
		email: 'john.doe@example.com',
		password: bcrypt.hashSync('123456'),
		role: 'admin',
	};
	
	const janeDoe = {
		id: 'ABC-123-JANE', // UUID(),
		name: 'Jane Doe',
		email: 'jane.doe@example.com',
		password: bcrypt.hashSync('123456'),
		role: 'user',
	};

	const gerryVoy = {
		id: 'XYZ-1122-GERRY', // UUID(),
		name: 'Gerry Voy',
		email: 'gerryvoy.2@gmail.com',
		password: bcrypt.hashSync('112255'),
		role: 'admin',
	};

	await db.insert(Role).values(roles);
	await db.insert(User).values([johnDoe, janeDoe, gerryVoy]);

	
	const queries: any = [];
	seedProducts.forEach( (p) => {
		const product = {
			id: UUID(),
			description: p.description,
			gender: p.gender,
			price: p.price,
			sizes: p.sizes.join(','),
			slug: p.slug,
			stock: p.stock,
			tags: p.tags.join(','),
			title: p.title,
			type: p.type,
			user: johnDoe.id,
		};
		queries.push(db.insert(Product).values(product));

		p.images.forEach( (img) => {
			const image = {
				id: UUID(),
				image: img,
				product: product.id,
			};
			queries.push(db.insert(ProductImage).values(image));
		});
	});
	await db.batch(queries);
}
