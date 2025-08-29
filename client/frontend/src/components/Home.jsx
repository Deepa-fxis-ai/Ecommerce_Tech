import Header from './Header.jsx'
import './Home.css'

const Home=()=>{
    return(
    <div className='HomeContainer'>
        <Header />
        <div className='card'>
           <p className='cardparagraph'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque est ea iusto tempore iste. At dolore aspernatur, voluptatum enim necessitatibus minima, beatae quidem eaque velit, eveniet quod? Aut, vel magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, voluptatum tempore animi a rerum nemo quos suscipit dicta. Aliquid ea odio quam voluptatibus omnis eum sapiente quibusdam sequi minima nobis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tempore nulla animi commodi nemo praesentium ipsa excepturi consequuntur quibusdam minima placeat modi alias culpa iste, dolorem beatae esse, officia dolore.</p>
           <img src="https://static.vecteezy.com/system/resources/previews/000/670/449/original/woman-online-shopping-with-laptop-and-e-commerce-elements-vector.jpg" alt="shopping-image" className='image'/>
        </div>
        <div className='card'>
            <img src="https://static.vecteezy.com/system/resources/previews/015/501/183/original/woman-ordering-items-from-cart-in-online-shopping-website-illustration-vector.jpg" alt="shopping-image" className='image'/>
           <p className='cardparagraph'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque est ea iusto tempore iste. At dolore aspernatur, voluptatum enim necessitatibus minima, beatae quidem eaque velit, eveniet quod? Aut, vel magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, voluptatum tempore animi a rerum nemo quos suscipit dicta. Aliquid ea odio quam voluptatibus omnis eum sapiente quibusdam sequi minima nobis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tempore nulla animi commodi nemo praesentium ipsa excepturi consequuntur quibusdam minima placeat modi alias culpa iste, dolorem beatae esse, officia dolore.</p>
           
        </div>
        <div className='card'>
           <p className='cardparagraph'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque est ea iusto tempore iste. At dolore aspernatur, voluptatum enim necessitatibus minima, beatae quidem eaque velit, eveniet quod? Aut, vel magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, voluptatum tempore animi a rerum nemo quos suscipit dicta. Aliquid ea odio quam voluptatibus omnis eum sapiente quibusdam sequi minima nobis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tempore nulla animi commodi nemo praesentium ipsa excepturi consequuntur quibusdam minima placeat modi alias culpa iste, dolorem beatae esse, officia dolore.</p>
           <img src="https://www.creativefabrica.com/wp-content/uploads/2022/11/29/Online-Shopping-Illustration-Graphics-49309593-1.jpg" alt="shopping-image" className='image'/>
        </div>
    </div>
    )
}

export default Home;