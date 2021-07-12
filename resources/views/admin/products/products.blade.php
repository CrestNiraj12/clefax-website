@extends('layouts.admin')

@section('content')

<!-- Main content -->
<section class="content">

    <!-- Default box -->
    <div class="card">
    @if (auth()->user()->role == "Trader")
    <div class="card-header">
        <div class="card-tools">
            <a href="/admin/products/add" class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-baseline">
                <i class="fas fa-plus mr-1"></i>
                <span>Add Product</span>
            </a>
        </div>
    </div>
    @endif
    <div class="card-body p-0">
        <table class="min-w-max w-full table-auto">
            <thead>
                <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th class="py-3 px-6 text-left">
                        Name
                    </th>
                    <th class="py-3 px-6 text-left">
                        Image
                    </th>
                    <th class="py-3 px-6 text-left">
                        Category
                    </th>
                    <th class="py-3 px-6 text-left">
                        Stock
                    </th>
                    <th class="py-3 px-6 text-left">
                        Discount (%)
                    </th>
                    <th class="py-3 px-6 text-left">
                        Price
                    </th>
                    <th class="py-3 px-6 text-left">
                        Max Order
                    </th>
                    <th class="py-3 px-6 text-left">
                        Shop
                    </th>
                    <th class="py-3 px-6 text-center"></th>
                </tr>
            </thead>
            <tbody class="text-gray-600 text-sm font-light">
                @if (count($products) > 0)
                    @foreach ($products as $product)
                    @include('admin.products.modal.delete')
                    <tr class="border-b border-gray-200 hover:bg-gray-100">
                        <td class="py-3 px-6 text-left">
                            <p>{{ $product["name"] }}</p>
                        </td>
                        <td class="py-3 px-6 text-center">
                            <img 
                                class="w-10 h-10 rounded-full" 
                                src="{{$product['images'][0]}}" 
                                alt="{{ $product['name'] }}" />
                        </td>
                        <td class="py-3 px-6 text-left">
                            <p>{{ $product["category"] ? $product["category"]["name"] : "Null" }}</p>
                        </td>
                        <td class="py-3 px-6 text-left">
                           <p>@convertQty($product["qty"]) {{ $product["unit"] }}(s) </p>
                        </td>
                        <td class="py-3 px-6 text-center">
                            <p>@convert($product["discount"])%</p>
                        </td>
                        <td class="py-3 px-6 text-center">
                            <p>£@convert($product["price"])</p>
                        </td>
                        <td class="py-3 px-6 text-center">
                            <p>{{ $product["max_order"] }}</p>
                        </td>
                        <td class="py-3 px-6 text-left">
                            <p>{{ $product["shop"]["name"] }}</p>
                        </td>
                        <td class="py-3 px-6 text-center">
                            <div class="flex item-center justify-center ">
                                <a href="/admin/products/{{ $product['id'] }}/view" class="cursor-pointer w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </a>
                                @if (auth()->user()->role == "Trader")
                                <a href="/admin/products/{{ $product['id'] }}/edit" class="w-4 mr-2 transform hover:text-purple-500 cursor-pointer hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </a>
                                @endif
                                
                                <button class="w-4 mr-2 transform hover:text-red-500 cursor-pointer hover:scale-110 showDelBtn" type="submit">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                            {{-- <a class="btn btn-info btn-sm" href="/admin/products/{{ $product['id'] }}/edit">
                                <i class="fas fa-pencil-alt">
                                </i>
                                Edit
                            </a>
                            <form style="display:inline" method="POST" action="{{ route('products.destroy', $product->id) }}">
                                @method('DELETE')
                                @csrf
                                <button class="btn btn-danger btn-sm" type="submit">
                                    <i class="fas fa-trash">
                                    </i>
                                    Delete
                                </button>
                            </form> --}}
                        </td>
                    </tr>
                    @endforeach
                @else
                <tr class="brequest-b brequest-gray-200 hover:bg-gray-100"><td colspan="9" class="py-3 px-6 text-left">No products found!</td></tr>
                @endif
            </tbody>
        </table>
        <div class="my-3 mx-3">
            {!! $products->links() !!}
        </div>
    </div>
    <!-- /.card-body -->
    </div>
    <!-- /.card -->

</section>

<script type="text/javascript">
   window.onload = function() {
        var openmodal = document.querySelectorAll('.showDelBtn');
        for (var i = 0; i < openmodal.length; i++) {
            openmodal[i].addEventListener('click', function(event){
                event.preventDefault();
                toggleModal();
            });
        }
        
        var closemodal = document.querySelectorAll('.cancelDelBtn');
        for (var i = 0; i < closemodal.length; i++) {
            closemodal[i].addEventListener('click', function(event){
                event.preventDefault();
                toggleModal();
            });
        }

        function toggleModal () {
            const body = document.querySelector('body');
            const modal = document.querySelector('#confirmDelModal');
            modal.classList.toggle('opacity-0');
            modal.classList.toggle('invisible');
            modal.classList.toggle('visible');
            modal.classList.toggle('pointer-events-none');
            body.classList.toggle('modal-active');
        }
   }
</script>

<!-- /.content -->
@endsection


