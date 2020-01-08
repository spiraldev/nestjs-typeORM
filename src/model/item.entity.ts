import { Entity, Column,CreateDateColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ database:'sandbox01', name: 'forms',schema: 'blacktie' })
export class FormsEntity extends BaseEntity {
	@Column({ type: 'int' })
	formfamily_id: number;

	@Column({ type: 'int' })
	published_formversion_id: number;

	@Column({ type: 'character varying' })
	name: string;

	@Column({ type: 'character varying' })
	description: boolean;

	@Column({ type: 'boolean' })
	active: any;

	@Column({ type: 'jsonb' })
	properties: any;

	@CreateDateColumn({
		type: 'timestamptz',
		default: () => 'CURRENT_TIMESTAMP',
	})
	modifiedat: Date;

	@Column({ type: 'int' })
	modifiedby: string;


}
