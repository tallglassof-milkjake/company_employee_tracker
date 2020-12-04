USE employee_db;

INSERT INTO department (department_name)
	VALUES 
		('Management'),
        ('Finance'),
        ('Legal'),
        ('HR'),
        ('Sales');
        
INSERT INTO employee (first_name, last_name, role_id, manager_id)
	VALUES 
		('George','Lucas','15','1'),
        ('Danny','Trejo','10','1'),
        ('Brad','Pitt','9','1'),
        ('Peter','Parker','5','1'),
        ('David','Davidson','4','1'),
        ('Paul','Rudd','15','2'),
        ('John','Malcovich','6','2'),
        ('Kathy','Gates','7','2'),
        ('Selena','Gomez','2','2'),
        ('Miranda','Phillips','12','2'),
        ('Johnathon','McDonald','13','5'),
        ('Lucas','Gerladton','10','3'),
        ('Paul','Stamets','11','3'),
        ('Gravy','Train','14','3'),
        ('Hell','Boy','6','5'),
        ('Angelina','Jolie','3','4'),
        ('Oscar','Isaac','6','4'),
        ('Donald','Glover','3','4'),
        ('Bruce','Willis','2','5'),
        ('Morgan','Freeman','14','4');
        
INSERT INTO employee_role (title, salary, department_id)
	VALUES
		('CEO', '195000', '1'),
        ('Junior Associate', '195000', '3'),
        ('Senior Associate', '195000', '3'),
        ('Partner', '195000', '3'),
        ('Managing Partner', '195000', '1'),
        ('Analyst', '195000', '2'),
        ('Accountant', '195000', '2'),
        ('Auditor', '195000', '2'),
        ('CFO', '195000', '1'),
        ('CHRO', '195000', '1'),
        ('Estimator', '195000', '2'),
        ('HR Administrator', '195000', '4'),
        ('Recruitor', '195000', '4'),
        ('Managing Sales Director', '195000', '4'),
        ('Sales Associate', '195000', '5'),
        ('Sales Reprasentative', '195000', '5'),
        ('Regional Sales Manager', '195000', '5'),
        ('Sales Consultant', '195000', '5');
        